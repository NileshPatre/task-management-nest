import { Body, Controller, Get, Header, Put, Query } from "@nestjs/common";
import { TaskManagementService } from "./task-management.service";
import { TasksFilterDto } from "./dto/tasks-filters.dto";
import { TaskDetailsQueryDto } from "./dto/task-details-query.dto";
import { TaskUpdateDto } from "./dto/task-update.dto";
import { CommonValuesDTO } from "./dto/common-values.dto";
import { UpdateResultDto } from "./dto/update-result.dto";
import { TasksDataDto, TasksResponseDto } from "./dto/tasks-response.dto";

@Controller("task-management")
export class TaskManagementController {
  constructor(private taskManagementService: TaskManagementService) {}

  @Get("/getAllStatus")
  @Header("content-type", "text/json")
  getAllStatus(): Promise<CommonValuesDTO[]> {
    return this.taskManagementService.getAllStatus();
  }
  @Get("/getTasks")
  @Header("content-type", "text/json")
  getTasks(@Query() tasksFilterDto: TasksFilterDto): Promise<TasksResponseDto> {
    return this.taskManagementService.getTasks(tasksFilterDto);
  }
  @Get("/getTaskDetails")
  @Header("content-type", "text/json")
  getTaskDetails(
    @Query() taskDetailsQueryDto: TaskDetailsQueryDto
  ): Promise<TasksDataDto> {
    return this.taskManagementService.getTaskDetails(taskDetailsQueryDto);
  }
  @Put("/updateTask")
  @Header("content-type", "text/json")
  updateTask(@Body() taskUpdateDto: TaskUpdateDto): Promise<UpdateResultDto> {
    return this.taskManagementService.updateTask(taskUpdateDto);
  }
}
