import { IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";
export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  username: string;
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  password: string;
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  confirmPassword: string;
}
