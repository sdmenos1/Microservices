"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendance_entity_1 = require("./entities/attendance.entity");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AttendanceService = class AttendanceService {
    constructor(attendanceRepository, httpService) {
        this.attendanceRepository = attendanceRepository;
        this.httpService = httpService;
    }
    async createAttendance(createAttendanceDto) {
        await this.validateStudentExists(createAttendanceDto.studentId);
        await this.validateTeacherExists(createAttendanceDto.teacherId);
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
    async createBulkAttendance(attendances) {
        const results = [];
        for (const attendanceDto of attendances) {
            try {
                const attendance = await this.createAttendance(attendanceDto);
                results.push(attendance);
            }
            catch (error) {
                console.error(`Error creating attendance for student ${attendanceDto.studentId}:`, error);
            }
        }
        return results;
    }
    async validateStudentExists(studentId) {
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(`http://localhost:3002/students/${studentId}`));
            return response.data?.data;
        }
        catch (error) {
            throw new Error(`Student with ID ${studentId} does not exist`);
        }
    }
    async validateTeacherExists(teacherId) {
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(`http://localhost:3002/students/teachers/${teacherId}`));
            return response.data?.data;
        }
        catch (error) {
            throw new Error(`Teacher with ID ${teacherId} does not exist`);
        }
    }
    async getStudentAttendance(studentId, filters) {
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
    async getCourseAttendance(courseId, filters) {
        const query = this.attendanceRepository
            .createQueryBuilder('attendance')
            .where('attendance.courseId = :courseId', { courseId });
        if (filters.date) {
            query.andWhere('attendance.date = :date', { date: filters.date });
        }
        else if (filters.startDate && filters.endDate) {
            query.andWhere('attendance.date BETWEEN :startDate AND :endDate', {
                startDate: filters.startDate,
                endDate: filters.endDate,
            });
        }
        query.orderBy('attendance.date', 'DESC');
        return await query.getMany();
    }
    async getTeacherAttendance(teacherId, filters) {
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
    async getStudentAttendanceStats(studentId) {
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
        const attendancePercentage = totalAttendance > 0
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
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map