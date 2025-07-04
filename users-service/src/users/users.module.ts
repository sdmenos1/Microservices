import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { StudentsController } from "./users.controller"
import { UsersService } from "./users.service"
import { Student } from "./entities/student.entity"
import { Teacher } from "./entities/teacher.entity"
import { HttpModule } from "@nestjs/axios"
@Module({
  imports: [TypeOrmModule.forFeature([Student,Teacher]),HttpModule],
  controllers: [StudentsController],
  providers: [UsersService],
})
export class StudentsModule {}
