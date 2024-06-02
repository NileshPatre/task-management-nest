import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CommonValuesDTO } from "./common-values.dto";

export class TaskUpdateDto {
  @IsNotEmpty({ message: "Id must not be empty" })
  @IsString({ message: "Id must be string" })
  @Type(() => String)
  id: string;
  @IsNotEmpty({ message: "Title must not be empty" })
  @IsString({ message: "Title must be string" })
  @Type(() => String)
  title: string;
  @IsOptional()
  @IsString({ message: "Description must be string" })
  @Type(() => String)
  description?: string;
  @IsNotEmpty({ message: "Status is required" })
  @Type(() => CommonValuesDTO)
  status: CommonValuesDTO;
}
