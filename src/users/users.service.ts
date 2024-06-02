import { Injectable } from "@nestjs/common";
import { UsersRepo } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepo) {}
  async getUser(username: string) {
    return this.userRepo.getUser(username);
  }
  async createUser(username: string, password: string) {
    await this.userRepo.createUser(username, password);
    return "Success";
  }
}
