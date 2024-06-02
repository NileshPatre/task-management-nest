import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TaskManagementModule } from "./task-management/task-management.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configValidationSchema } from "./config/env-config.schema";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
@Module({
  imports: [
    TaskManagementModule,
    ConfigModule.forRoot({
      envFilePath: ["./.env"],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        host: configService.get("PG_DB_HOST"),
        port: configService.get("PG_DB_PORT"),
        username: configService.get("PG_DB_USERNAME"),
        password: configService.get("PG_DB_PASSWORD"),
        database: configService.get("PG_DB_DATABASE"),
        logging: false,
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
