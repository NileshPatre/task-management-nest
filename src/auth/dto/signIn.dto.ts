import { IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";
export class SignInDTO {
  @IsNotEmpty({ message: "Username must not be empty" })
  @IsString({ message: "Username must be a string" })
  @Type(() => String)
  username: string;
  @IsNotEmpty({ message: "Password must not be empty" })
  @IsString({ message: "Password must be a string" })
  @Type(() => String)
  password: string;
}
