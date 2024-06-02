import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./entities/users";

export class UsersRepo {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}
  async getUser(username: string): Promise<any> {
    const record = await this.usersRepository.findOne({
      where: { username },
    });
    return record;
  }
  async createUser(username: string, password: string) {
    const user = this.usersRepository.create({ username, password });
    return this.usersRepository.save(user);
  }
}
