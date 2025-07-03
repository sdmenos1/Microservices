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
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const attendance_service_1 = require("./attendance.service");
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    async createAttendance(createAttendanceDto) {
        const attendance = await this.attendanceService.createAttendance(createAttendanceDto);
        return {
            success: true,
            data: attendance,
            message: 'Attendance recorded successfully',
        };
    }
    async createBulkAttendance(body) {
        const attendances = await this.attendanceService.createBulkAttendance(body.attendances);
        return {
            success: true,
            data: attendances,
            message: 'Bulk attendance recorded successfully',
        };
    }
    async getStudentAttendance(studentId, courseId, startDate, endDate) {
        const attendance = await this.attendanceService.getStudentAttendance(studentId, { courseId, startDate, endDate });
        return {
            success: true,
            data: attendance,
            message: 'Student attendance retrieved successfully',
        };
    }
    async getCourseAttendance(courseId, date, startDate, endDate) {
        const attendance = await this.attendanceService.getCourseAttendance(courseId, { date, startDate, endDate });
        return {
            success: true,
            data: attendance,
            message: 'Course attendance retrieved successfully',
        };
    }
    async getTeacherAttendance(teacherId, date, courseId) {
        const attendance = await this.attendanceService.getTeacherAttendance(teacherId, { date, courseId });
        return {
            success: true,
            data: attendance,
            message: 'Teacher attendance retrieved successfully',
        };
    }
    async getStudentAttendanceStats(studentId) {
        const stats = await this.attendanceService.getStudentAttendanceStats(studentId);
        return {
            success: true,
            data: stats,
            message: 'Student attendance stats retrieved successfully',
        };
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "createAttendance", null);
__decorate([
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "createBulkAttendance", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Query)('courseId')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getStudentAttendance", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Query)('date')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getCourseAttendance", null);
__decorate([
    (0, common_1.Get)('teacher/:teacherId'),
    __param(0, (0, common_1.Param)('teacherId')),
    __param(1, (0, common_1.Query)('date')),
    __param(2, (0, common_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getTeacherAttendance", null);
__decorate([
    (0, common_1.Get)('stats/student/:studentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getStudentAttendanceStats", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, common_1.Controller)('attendance'),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map