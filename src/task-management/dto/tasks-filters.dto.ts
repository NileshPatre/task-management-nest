import { IsArray, IsInt, IsOptional, IsString } from "class-validator";
import { Transform, Type } from "class-transformer";
import { escapeSpecialCharacters } from "../services/utils";
import { FiltersDto } from "./filters.dto";
export class TasksFilterDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    return escapeSpecialCharacters(value);
  })
  search?: string;
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pageNumber?: number = 1;
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pageSize?: number = 100;
  @IsOptional()
  @IsArray()
  @Type(() => FiltersDto)
  filters?: FiltersDto[];
}
