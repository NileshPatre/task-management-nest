import { IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";
export class CommonValuesDTO {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id: string;
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name: string;
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  label: string;
}
