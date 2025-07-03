import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import type { CreateAttendanceDto } from './dto/create-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
async createAttendance(@Body() createAttendanceDto: CreateAttendanceDto) {
  const attendance =
    await this.attendanceService.createAttendance(createAttendanceDto);
  return {
    success: true,
    data: attendance,
    message: 'Attendance recorded successfully',
  };
}

  @Post('bulk')
  async createBulkAttendance(@Body() body: { attendances: CreateAttendanceDto[] }) {
    const attendances = await this.attendanceService.createBulkAttendance(
      body.attendances,
    );
    return {
      success: true,
      data: attendances,
      message: 'Bulk attendance recorded successfully',
    };
  }

  @Get('student/:studentId')
  async getStudentAttendance(
    @Param('studentId') studentId: number,
    @Query('courseId') courseId?: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const attendance = await this.attendanceService.getStudentAttendance(
      studentId,
      { courseId, startDate, endDate },
    );
    return {
      success: true,
      data: attendance,
      message: 'Student attendance retrieved successfully',
    };
  }

  @Get('course/:courseId')
  async getCourseAttendance(
    @Param('courseId') courseId: number,
    @Query('date') date?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const attendance = await this.attendanceService.getCourseAttendance(
      courseId,
      { date, startDate, endDate },
    );
    return {
      success: true,
      data: attendance,
      message: 'Course attendance retrieved successfully',
    };
  }

  @Get('teacher/:teacherId')
  async getTeacherAttendance(
    @Param('teacherId') teacherId: number,
    @Query('date') date?: string,
    @Query('courseId') courseId?: number,
  ) {
    const attendance = await this.attendanceService.getTeacherAttendance(
      teacherId,
      { date, courseId },
    );
    return {
      success: true,
      data: attendance,
      message: 'Teacher attendance retrieved successfully',
    };
  }

  @Get('stats/student/:studentId')
  async getStudentAttendanceStats(@Param('studentId') studentId: number) {
    const stats =
      await this.attendanceService.getStudentAttendanceStats(studentId);
    return {
      success: true,
      data: stats,
      message: 'Student attendance stats retrieved successfully',
    };
  }
}
