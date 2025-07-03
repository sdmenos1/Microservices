import { Controller, Get, Body , Post, Param } from "@nestjs/common"
import { CoursesService } from "./course.service"
import { AssignCourseDto } from "./dto/assing-course.dto"
import { CreateCourseDto } from "./dto/create-course.dto"
@Controller("courses")
export class CoursesController {
    constructor(private readonly CoursesService: CoursesService) {}
    @Get()
    async getAllCourses() {
    const courses = await this.CoursesService.getAllCourses();
    return {
        success: true,
        data: courses,
        message: "Courses retrieved successfully",
    };
    }

    @Get("by-course/:courseId")
    async getStudentsByCourse(@Param("courseId") courseId: number) {
    const students = await this.CoursesService.getStudentsByCourse(courseId)
    return {
      success: true,
      data: students,
      message: "Students retrieved successfully",
    }
  }
@Post()
async createCourse(@Body() dto: CreateCourseDto) {
  const course = await this.CoursesService.createCourse(dto)
  return {
    success: true,
    data: course,
    message: "Course created successfully",
  }
}
@Post("student-courses")
async assignCourse(@Body() dto: AssignCourseDto) {
  const studentCourse = await this.CoursesService.assignCourseToStudent(dto);
  return {
    success: true,
    data: studentCourse,
    message: "Course assigned to student successfully",
  };
}
@Get("by-teacher/:teacherId")
async getStudentsByTeacher(@Param("teacherId") teacherId: number) {
    const students = await this.CoursesService.getStudentsByTeacher(teacherId)
    return {
      success: true,
      data: students,
      message: "Students retrieved successfully",
    }
  }
}