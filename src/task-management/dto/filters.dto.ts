import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class FiltersDto {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  filterName: string;
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  filterType: "dateRange" | "multiValues";
  @IsNotEmpty()
  @IsArray()
  @Type(() => FilterValuesDto)
  @ValidateNested({ each: true })
  filterValues: FilterValuesDto[];
}
export class FilterValuesDto {
  @IsString()
  id: string;
  @IsNotEmpty()
  @IsString()
  value: string;
}
