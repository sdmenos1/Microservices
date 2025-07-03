import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import type { CreateAttendanceDto } from './dto/create-attendance.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    private readonly httpService: HttpService,
  ) {}

  async createAttendance(createAttendanceDto: CreateAttendanceDto) {
    await this.validateStudentExists(createAttendanceDto.studentId);
    await this.validateTeacherExists(createAttendanceDto.teacherId); // 🔒
  
    const existingAttendance = await this.attendanceRepository.findOne({
      where: {
        studentId: createAttendanceDto.studentId,
        courseId: createAttendanceDto.courseId,
        date: createAttendanceDto.date,
      },
    });
  
    if (existingAttendance) {
      Object.assign(existingAttendance, createAttendanceDto);
      return await this.attendanceRepository.save(existingAttendance);
    }
  
    const attendance = this.attendanceRepository.create(createAttendanceDto);
    return await this.attendanceRepository.save(attendance);
  }
  
  

  async createBulkAttendance(attendances: CreateAttendanceDto[]) {
    const results = [];

    for (const attendanceDto of attendances) {
      try {
        const attendance = await this.createAttendance(attendanceDto);
        results.push(attendance);
      } catch (error) {
        console.error(
          `Error creating attendance for student ${attendanceDto.studentId}:`,
          error,
        );
      }
    }

    return results;
  }
  private async validateStudentExists(studentId: number) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`http://localhost:3002/students/${studentId}`) //http://localhost:3002/students/1,2,34,5,
      );
      return response.data?.data;
    } catch (error) {
      throw new Error(`Student with ID ${studentId} does not exist`);
    }
  }

  private async validateTeacherExists(teacherId: number) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`http://localhost:3002/students/teachers/${teacherId}`)
      );
      return response.data?.data;
    } catch (error) {
      throw new Error(`Teacher with ID ${teacherId} does not exist`);
    }
  }
  
  async getStudentAttendance(
    studentId: number,
    filters: { courseId?: number; startDate?: string; endDate?: string },
  ) {
    const query = this.attendanceRepository
      .createQueryBuilder('attendance')
      .where('attendance.studentId = :studentId', { studentId });

    if (filters.courseId) {
      query.andWhere('attendance.courseId = :courseId', {
        courseId: filters.courseId,
      });
    }

    if (filters.startDate && filters.endDate) {
      query.andWhere('attendance.date BETWEEN :startDate AND :endDate', {
        startDate: filters.startDate,
        endDate: filters.endDate,
      });
    }

    query.orderBy('attendance.date', 'DESC');

    return await query.getMany();
  }

  async getCourseAttendance(
    courseId: number,
    filters: { date?: string; startDate?: string; endDate?: string },
  ) {
    const query = this.attendanceRepository
      .createQueryBuilder('attendance')
      .where('attendance.courseId = :courseId', { courseId });

    if (filters.date) {
      query.andWhere('attendance.date = :date', { date: filters.date });
    } else if (filters.startDate && filters.endDate) {
      query.andWhere('attendance.date BETWEEN :startDate AND :endDate', {
        startDate: filters.startDate,
        endDate: filters.endDate,
      });
    }

    query.orderBy('attendance.date', 'DESC');

    return await query.getMany();
  }

  async getTeacherAttendance(
    teacherId: number,
    filters: { date?: string; courseId?: number },
  ) {
    const query = this.attendanceRepository
      .createQueryBuilder('attendance')
      .where('attendance.teacherId = :teacherId', { teacherId });

    if (filters.date) {
      query.andWhere('attendance.date = :date', { date: filters.date });
    }

    if (filters.courseId) {
      query.andWhere('attendance.courseId = :courseId', {
        courseId: filters.courseId,
      });
    }

    query.orderBy('attendance.date', 'DESC');

    return await query.getMany();
  }

  async getStudentAttendanceStats(studentId: number) {
    const totalAttendance = await this.attendanceRepository.count({
      where: { studentId },
    });

    const presentCount = await this.attendanceRepository.count({
      where: { studentId, status: 'present' },
    });

    const absentCount = await this.attendanceRepository.count({
      where: { studentId, status: 'absent' },
    });

    const lateCount = await this.attendanceRepository.count({
      where: { studentId, status: 'late' },
    });

    const attendancePercentage =
      totalAttendance > 0
        ? Math.round((presentCount / totalAttendance) * 100)
        : 0;

    return {
      totalClasses: totalAttendance,
      present: presentCount,
      absent: absentCount,
      late: lateCount,
      attendancePercentage,
    };
  }
}
