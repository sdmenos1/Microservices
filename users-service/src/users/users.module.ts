import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { StudentsController } from "./users.controller"
import { StudentsService } from "./users.service"
import { Student } from "./entities/student.entity"
import { Teacher } from "./entities/teacher.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Student,Teacher])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
