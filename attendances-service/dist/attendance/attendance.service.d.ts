import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import type { CreateAttendanceDto } from './dto/create-attendance.dto';
import { HttpService } from '@nestjs/axios';
export declare class AttendanceService {
    private readonly attendanceRepository;
    private readonly httpService;
    constructor(attendanceRepository: Repository<Attendance>, httpService: HttpService);
    createAttendance(createAttendanceDto: CreateAttendanceDto): Promise<Attendance>;
    createBulkAttendance(attendances: CreateAttendanceDto[]): Promise<any[]>;
    private validateStudentExists;
    private validateTeacherExists;
    getStudentAttendance(studentId: number, filters: {
        courseId?: number;
        startDate?: string;
        endDate?: string;
    }): Promise<Attendance[]>;
    getCourseAttendance(courseId: number, filters: {
        date?: string;
        startDate?: string;
        endDate?: string;
    }): Promise<Attendance[]>;
    getTeacherAttendance(teacherId: number, filters: {
        date?: string;
        courseId?: number;
    }): Promise<Attendance[]>;
    getStudentAttendanceStats(studentId: number): Promise<{
        totalClasses: number;
        present: number;
        absent: number;
        late: number;
        attendancePercentage: number;
    }>;
}
