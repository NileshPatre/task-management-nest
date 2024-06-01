import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { StatusRepo, TasksRepo } from "./task-management.repository";
import { TasksFilterDto } from "./dto/tasks-filters.dto";
import { TaskDetailsQueryDto } from "./dto/task-details-query.dto";
import { TasksDataDto } from "./dto/tasks-response.dto";
import { TaskUpdateDto } from "./dto/task-update.dto";
import { UpdateResultDto } from "./dto/update-result.dto";

@Injectable()
export class TaskManagementService {
  constructor(
    private readonly statusRepo: StatusRepo,
    private readonly tasksRepo: TasksRepo
  ) {}
  async getAllStatus() {
    return this.statusRepo.getAllStatus();
  }
  async getTasks(tasksFilterDto: TasksFilterDto) {
    try {
      return this.tasksRepo.getTasks(tasksFilterDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async getTaskDetails(
    taskDetailsQueryDto: TaskDetailsQueryDto
  ): Promise<TasksDataDto> {
    try {
      const { id } = taskDetailsQueryDto;
      return this.tasksRepo.getTaskDetails(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateTask(taskUpdateDto: TaskUpdateDto): Promise<UpdateResultDto> {
    try {
      const { id, title, description, status } = taskUpdateDto;
      const recordToUpdate = await this.tasksRepo.getTaskDetails(id);
      if (recordToUpdate.status.name === "done") {
        throw new ConflictException("Task is already done");
      }
      if (
        recordToUpdate.status.name === status.name &&
        recordToUpdate.title === title &&
        recordToUpdate.description === description
      ) {
        return { success: true };
      }

      await this.tasksRepo.updatetask(taskUpdateDto);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
