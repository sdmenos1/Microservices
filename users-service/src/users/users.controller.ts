import { Controller, Get, Query, Body , Post, Param } from "@nestjs/common"
import { UsersService } from "./users.service"
import { CreateStudentDto } from "./dto/create-student.dto"
import { CreateTeacherDto } from "./dto/create-teacher.dto"
//localhost:3002/students/teachers
@Controller("students")
export class StudentsController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getStudents(
    @Query('grade') grade?: string,
    @Query('section') section?: string,
    @Query('level') level?: string,
    @Query('search') search?: string,
  ) {
    const students = await this.usersService.getStudents({
      grade,
      section,
      level,
      search
    })
    return {
      success: true,
      data: students,
      message: "Students retrieved successfully",
    }
  }
  //localhost:3002/students/teachers
  
  @Get('teachers')
async getAllTeachers() {
  const teachers = await this.usersService.getTeachers();
  return {
    success: true,
    data: teachers,
    message: 'Teachers retrieved successfully',
  };
}
  //localhost:3002/students/(1,2,etc) params -> parametros 
  @Get(":id")
  async getStudent(id: number) {
    const student = await this.usersService.getStudentById(id)
    return {
      success: true,
      data: student,
      message: "Student retrieved successfully",
    }
  }
  //localhost:3002/students/teachers/1,2,34
  @Get('teachers/:id')
async getTeacher(@Param('id') id: number) {
  const teacher = await this.usersService.getTeacherById(id);
  return {
    success: true,
    data: teacher,
    message: 'Teacher retrieved successfully',
  };
}
// students.controller.ts
@Get(':id/courses')
async getStudentCourses(@Param('id') id: number) {
  const courses = await this.usersService.getStudentCourses(Number(id));
  return {
    success: true,
    data: courses,
    message: 'Courses retrieved successfully',
  };
}


  @Post("validate-login")
async validateStudentLogin(@Body() body: { email: string; password: string }) {
  const student = await this.usersService.validateStudentLogin(body.email, body.password);

  return {
    success: true,
    data: student,
    message: "Login successful",
  };
}

@Post("teachers/validate-login")
async validateTeacherLogin(@Body() body: { email: string; password: string }) {
  const teacher = await this.usersService.validateTeacherLogin(body.email, body.password);

  return {
    success: true,
    data: teacher,
    message: "Login successful",
  };
}

  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.usersService.createStudent(createStudentDto)
    return {
      success: true,
      data: student,
      message: "Student created successfully",
    }
  }

  @Post("/teachers")
  async createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    const teacher = await this.usersService.createTeacher(createTeacherDto)
    return {
      success: true,
      data: teacher,
      message: "Teacher created successfully",
    }
  }

}
