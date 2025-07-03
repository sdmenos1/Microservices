// src/students/dto/assign-course.dto.ts

import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AssignCourseDto {
  @IsNumber()
  studentId: number

  @IsNumber()
  courseId: number

  @IsString()
  @IsNotEmpty()
  academicYear: string

  @IsString()
  @IsNotEmpty()
  semester: string
}
