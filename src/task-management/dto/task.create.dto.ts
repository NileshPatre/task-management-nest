import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class TaskCreateDto {
  @IsNotEmpty({ message: "Title must not be empty" })
  @IsString({ message: "Title must be a string" })
  @Type(() => String)
  title: string;
  @IsOptional()
  @IsString({ message: "Title must be a string" })
  @Type(() => String)
  description?: string;
}
