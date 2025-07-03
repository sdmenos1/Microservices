import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"
import { CoursesModule } from "./courses/course.module"
import { Course } from "./courses/entity/course.entity"
import { StudentCourse } from "./courses/entity/student-course.entity"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST || "localhost",
      port: Number.parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_DATABASE || "colegio_students",
      entities: [Course, StudentCourse],
      synchronize: true,
      logging: true,
    }),
    CoursesModule,
  ],
})
export class AppModule {}
