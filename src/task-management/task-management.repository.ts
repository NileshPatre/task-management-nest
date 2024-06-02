import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Status } from "./entities/status";
import { Tasks } from "./entities/tasks";
import { CommonValuesDTO } from "./dto/common-values.dto";
import { TasksFilterDto } from "./dto/tasks-filters.dto";
import { TasksDataDto, TasksResponseDto } from "./dto/tasks-response.dto";
import { parseFiltersArrayToQueryObject } from "./services/utils";
import { TaskUpdateDto } from "./dto/task-update.dto";
import { NotFoundException } from "@nestjs/common";
import { TaskCreateDto } from "./dto/task.create.dto";

export class StatusRepo {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>
  ) {}
  getAllStatus(): Promise<CommonValuesDTO[]> {
    return this.statusRepository.find();
  }
  async getStatus(name: string) {
    let status = await this.statusRepository.findOne({
      where: { name },
    });
    return status;
  }
}
export class TasksRepo {
  constructor(
    @InjectRepository(Tasks)
    private readonly tasksRepository: Repository<Tasks>
  ) {}
  async getTasks(tasksFilterDto: TasksFilterDto): Promise<TasksResponseDto> {
    const { pageNumber, pageSize, search, filters } = tasksFilterDto;
    const queryBuilder: SelectQueryBuilder<Tasks> =
      this.tasksRepository.createQueryBuilder("tasks");
    // Joining Status table
    queryBuilder.leftJoinAndSelect("tasks.status", "status");
    if (search || (filters && filters.length)) {
      queryBuilder.where((qb) => {
        if (search) {
          qb.andWhere(
            "(CAST(tasks.id AS VARCHAR) ILIKE :search OR tasks.title ILIKE :search OR tasks.description ILIKE :search OR status.label ILIKE :search)",
            {
              search: `%${search}%`,
            }
          );
        }
        if (filters && filters.length) {
          const { startDate, endDate } =
            parseFiltersArrayToQueryObject(filters);
          if (startDate && endDate) {
            qb.andWhere("tasks.updatedAt BETWEEN :startDate AND :endDate", {
              startDate,
              endDate,
            });
          } else if (startDate) {
            qb.andWhere("tasks.updatedAt >= :startDate", {
              startDate,
            });
          } else if (endDate) {
            qb.andWhere("tasks.updatedAt <= :endDate", {
              endDate,
            });
          }
        }
      });
    }
    // Adding default sorting on updatedAt
    queryBuilder.orderBy("tasks.updatedAt", "DESC");
    // Applying pagination
    const [data, total] = await queryBuilder
      .skip(pageNumber && pageSize ? (pageNumber - 1) * (pageSize || 100) : 100)
      .take(pageSize || 100)
      .getManyAndCount();
    return { data, total };
  }

  async getTaskDetails(id: string): Promise<TasksDataDto> {
    const queryBuilder: SelectQueryBuilder<Tasks> =
      this.tasksRepository.createQueryBuilder("tasks");
    queryBuilder.leftJoinAndSelect("tasks.status", "status");
    queryBuilder.where("tasks.id = :id", { id });
    const results = await queryBuilder.getOne();
    return results;
  }

  async updatetask(taskUpdateDto: TaskUpdateDto): Promise<boolean> {
    const { id, title, description, status } = taskUpdateDto;
    // Check if a record with the specified id already exists
    const existingRecord = await this.tasksRepository.findOne({
      where: { id },
    });
    if (existingRecord) {
      existingRecord.title = title;
      existingRecord.description = description;
      existingRecord.status = status;
      existingRecord.updatedAt = new Date();
      await this.tasksRepository.save(existingRecord);
      return true;
    } else {
      throw new NotFoundException();
    }
  }
  async createTask(
    taskCreateDto: TaskCreateDto,
    status: CommonValuesDTO
  ): Promise<Tasks> {
    const { title, description } = taskCreateDto;
    const task = this.tasksRepository.create({ title, description, status });
    return this.tasksRepository.save(task);
  }
  async deleteTask(id: string): Promise<boolean> {
    const task = await this.tasksRepository.findOne({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException("Task not found");
    }
    await this.tasksRepository.remove(task);
    return true;
  }
}
