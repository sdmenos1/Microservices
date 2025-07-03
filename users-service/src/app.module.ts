import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"
import { StudentsModule } from "./users/users.module"
import { Student } from "./users/entities/student.entity"
import { Teacher } from "./users/entities/teacher.entity"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST || "localhost",
      port: Number.parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_DATABASE || "colegio_students",
      entities: [Student,Teacher],
      synchronize: true,
      logging: true,
    }),
    StudentsModule,
  ],
})
export class AppModule {}
