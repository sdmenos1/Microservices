import { AttendanceService } from './attendance.service';
import type { CreateAttendanceDto } from './dto/create-attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    createAttendance(createAttendanceDto: CreateAttendanceDto): Promise<{
        success: boolean;
        data: import("./entities/attendance.entity").Attendance;
        message: string;
    }>;
    createBulkAttendance(body: {
        attendances: CreateAttendanceDto[];
    }): Promise<{
        success: boolean;
        data: any[];
        message: string;
    }>;
    getStudentAttendance(studentId: number, courseId?: number, startDate?: string, endDate?: string): Promise<{
        success: boolean;
        data: import("./entities/attendance.entity").Attendance[];
        message: string;
    }>;
    getCourseAttendance(courseId: number, date?: string, startDate?: string, endDate?: string): Promise<{
        success: boolean;
        data: import("./entities/attendance.entity").Attendance[];
        message: string;
    }>;
    getTeacherAttendance(teacherId: number, date?: string, courseId?: number): Promise<{
        success: boolean;
        data: import("./entities/attendance.entity").Attendance[];
        message: string;
    }>;
    getStudentAttendanceStats(studentId: number): Promise<{
        success: boolean;
        data: {
            totalClasses: number;
            present: number;
            absent: number;
            late: number;
            attendancePercentage: number;
        };
        message: string;
    }>;
}
