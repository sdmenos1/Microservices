import {
    IsString,
    IsNotEmpty,
    IsEmail,
    IsOptional,
    IsDateString,
  } from "class-validator"
  
  export class CreateStudentDto {
    @IsString() @IsNotEmpty()
    firstName: string
  
    @IsString() @IsNotEmpty()
    lastName: string
  
    @IsEmail()
    email: string
  
    @IsString() @IsNotEmpty()
    password: string
  
    @IsDateString()
    dateOfBirth: string
  
    @IsString() @IsNotEmpty()
    grade: string
  
    @IsString() @IsNotEmpty()
    section: string
  
    @IsString() @IsNotEmpty()
    studentCode: string
  
    @IsString() @IsNotEmpty()
    phone?: string
  
    @IsString() @IsOptional()
    address?: string
  
    @IsString() @IsOptional()
    parentName?: string
  
    @IsString() @IsOptional()
    parentPhone?: string
  
    @IsEmail() @IsOptional()
    parentEmail?: string
  }
  