import { IsNotEmpty, IsNumber, IsString, IsOptional, Min, Max } from "class-validator"

export class CreateGradeDto {
  @IsNumber()
  @IsNotEmpty()
  studentId: number

  @IsNumber()
  @IsNotEmpty()
  courseId: number

  @IsNumber()
  @IsNotEmpty()
  teacherId: number

  @IsString()
  @IsNotEmpty()
  evaluationType: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsNumber()
  @Min(0)
  @Max(20)
  score: number

  @IsNumber()
  @Min(1)
  @Max(20)
  maxScore: number

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  weight?: number

  @IsString()
  @IsNotEmpty()
  evaluationDate: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsNotEmpty()
  academicYear: string

  @IsString()
  @IsNotEmpty()
  semester: string
}
