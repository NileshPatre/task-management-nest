import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { generateHash, matchHash } from "./utils/util";
import { RegisterDTO } from "./dto/register.dto";
import { GenericResponseDTO } from "src/task-management/dto/generic-response.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.getUser(username);
    if (!user) {
      throw new NotFoundException();
    }
    const isMatch = await matchHash({ hash: user.password, password: pass });
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async register(registerDto: RegisterDTO): Promise<GenericResponseDTO> {
    try {
      const { username, password, confirmPassword } = registerDto;
      if (password !== confirmPassword) {
        throw new BadRequestException("Password mismatch");
      }
      const user = await this.usersService.getUser(username);
      //if already present throw error
      if (user) {
        throw new ConflictException("Username is already taken");
      }
      const hash = await generateHash(password);
      await this.usersService.createUser(username, hash);
      return { success: true, message: "success" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
