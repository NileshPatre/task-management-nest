import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDTO } from "./dto/register.dto";
import { Public } from "src/decorators/public.decorator";
import { SignInDTO } from "./dto/signIn.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post("signIn")
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post("register")
  register(@Body() registerDto: RegisterDTO) {
    return this.authService.register(registerDto);
  }
}
