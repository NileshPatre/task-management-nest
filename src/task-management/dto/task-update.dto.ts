import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CommonValuesDTO } from "./common-values.dto";

export class TaskUpdateDto {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id: string;
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  title: string;
  @IsOptional()
  @IsString()
  @Type(() => String)
  description?: string;
  @IsNotEmpty()
  @Type(() => CommonValuesDTO)
  status: CommonValuesDTO;
}
