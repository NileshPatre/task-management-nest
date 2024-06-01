import { IsOptional, IsString } from "class-validator";

export class UpdateResultDto {
  @IsString()
  success: boolean;
  @IsOptional()
  @IsString()
  message?: string;
}
