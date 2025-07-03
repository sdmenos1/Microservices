import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CoursesController  } from "./course.controller"
import { CoursesService } from "./course.service"
import { Course } from "./entity/course.entity"
import { StudentCourse } from "./entity/student-course.entity"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [TypeOrmModule.forFeature([Course,StudentCourse]),HttpModule],
  controllers: [CoursesController ],
  providers: [CoursesService],
})
export class CoursesModule {}
