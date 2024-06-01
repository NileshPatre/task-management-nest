import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested
} from "class-validator";
import { CommonValuesDTO } from "./common-values.dto";

export class TasksResponseDto {
  @Type(() => TasksDataDto)
  @ValidateNested()
  data: TasksDataDto[];
  @IsNotEmpty()
  @IsNumber()
  total: number;
}
export class TasksDataDto {
  @IsString()
  id: string;
  @IsString()
  title: string;
  @IsNumber()
  description: string;
  @IsString()
  @Type(() => String)
  createdAt: string;
  @IsString()
  @Type(() => String)
  updatedAt: string;
  @Type(() => CommonValuesDTO)
  @ValidateNested()
  status: CommonValuesDTO;

}