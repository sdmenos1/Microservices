import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"
import { AttendanceModule } from "./attendance/attendance.module"
import { Attendance } from "./attendance/entities/attendance.entity"

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
      database: process.env.DB_DATABASE || "colegio_attendance",
      entities: [Attendance],
      synchronize: true,
      logging: true,
    }),
    AttendanceModule,
  ],
})
export class AppModule {}
