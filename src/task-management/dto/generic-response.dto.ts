import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class GenericResponseDTO {
  @IsNotEmpty()
  @IsBoolean()
  success: boolean;
  @IsNotEmpty()
  @IsString()
  message: string;
}
