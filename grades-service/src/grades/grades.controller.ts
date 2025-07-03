import { Controller, Get, Post, Put, Delete, Param, Query } from "@nestjs/common"
import { GradesService } from "./grades.service"
import type { CreateGradeDto } from "./dto/create-grade.dto"
import type { UpdateGradeDto } from "./dto/update-grade.dto"

@Controller("grades")
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  async createGrade(createGradeDto: CreateGradeDto) {
    const grade = await this.gradesService.createGrade(createGradeDto)
    return {
      success: true,
      data: grade,
      message: "Grade created successfully",
    }
  }

  @Put(":id")
  async updateGrade(@Param('id') id: number, updateGradeDto: UpdateGradeDto) {
    const grade = await this.gradesService.updateGrade(id, updateGradeDto)
    return {
      success: true,
      data: grade,
      message: "Grade updated successfully",
    }
  }

  @Delete(':id')
  async deleteGrade(@Param('id') id: number) {
    await this.gradesService.deleteGrade(id);
    return {
      success: true,
      message: 'Grade deleted successfully'
    };
  }

  @Get("student/:studentId")
  async getStudentGrades(
    @Param('studentId') studentId: number,
    @Query('courseId') courseId?: number,
    @Query('semester') semester?: string,
  ) {
    const grades = await this.gradesService.getStudentGrades(studentId, { courseId, semester })
    return {
      success: true,
      data: grades,
      message: "Student grades retrieved successfully",
    }
  }

  @Get("course/:courseId")
  async getCourseGrades(@Param('courseId') courseId: number, @Query('evaluationType') evaluationType?: string) {
    const grades = await this.gradesService.getCourseGrades(courseId, { evaluationType })
    return {
      success: true,
      data: grades,
      message: "Course grades retrieved successfully",
    }
  }

  @Get("teacher/:teacherId")
  async getTeacherGrades(@Param('teacherId') teacherId: number, @Query('courseId') courseId?: number) {
    const grades = await this.gradesService.getTeacherGrades(teacherId, { courseId })
    return {
      success: true,
      data: grades,
      message: "Teacher grades retrieved successfully",
    }
  }

  @Get('student/:studentId/summary')
  async getStudentGradeSummary(@Param('studentId') studentId: number) {
    const summary = await this.gradesService.getStudentGradeSummary(studentId);
    return {
      success: true,
      data: summary,
      message: 'Student grade summary retrieved successfully'
    };
  }

  @Get('course/:courseId/summary')
  async getCourseGradeSummary(@Param('courseId') courseId: number) {
    const summary = await this.gradesService.getCourseGradeSummary(courseId);
    return {
      success: true,
      data: summary,
      message: 'Course grade summary retrieved successfully'
    };
  }
}
