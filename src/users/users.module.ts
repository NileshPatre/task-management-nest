import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepo } from "./users.repository";
import { Users } from "./entities/users";
@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, UsersRepo],
  exports: [UsersService, UsersRepo],
})
export class UsersModule {}
