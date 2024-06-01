import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TaskManagementModule } from "./task-management/task-management.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configValidationSchema } from "./config/env-config.schema";
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
