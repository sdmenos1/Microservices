// src/students/dto/create-course.dto.ts

import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  code: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  teacherId: number

  @IsString()
  @IsNotEmpty()
  teacherName: string

  @IsString()
  @IsNotEmpty()
  grade: string

  @IsString()
  @IsNotEmpty()
  section: string

  @IsString()
  @IsNotEmpty()
  level: string

  @IsNumber()
  credits: number

  @IsString()
  @IsNotEmpty()
  classroom: string
}
