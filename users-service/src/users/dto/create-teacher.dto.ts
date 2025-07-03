// src/teachers/dto/create-teacher.dto.ts
import { IsString, IsEmail, IsDateString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateTeacherDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  specialization: string;

  @IsDateString()
  hireDate: string;
}
