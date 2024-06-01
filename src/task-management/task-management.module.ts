import { Module } from "@nestjs/common";
import { TaskManagementController } from "./task-management.controller";
import { TaskManagementService } from "./task-management.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  StatusRepo,
  TasksRepo,
} from "./task-management.repository";
import { Tasks } from "./entities/tasks";
import { Status } from "./entities/status";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Status,
      Tasks
    ])
  ],
  controllers: [TaskManagementController],
  providers: [
    TaskManagementService,
    StatusRepo,
    TasksRepo
    
  ]
})
export class TaskManagementModule {}
