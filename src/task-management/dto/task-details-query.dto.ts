import { IsNotEmpty, IsString } from "class-validator";

export class TaskDetailsQueryDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
