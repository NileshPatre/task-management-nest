import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
export class TaskDeleteDto {
  @IsNotEmpty({ message: "Id must not be empty" })
  @IsString({ message: "Id must be string" })
  @Type(() => String)
  id: string;
}
