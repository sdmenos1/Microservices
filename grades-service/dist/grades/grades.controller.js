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
exports.GradesController = void 0;
const common_1 = require("@nestjs/common");
const grades_service_1 = require("./grades.service");
let GradesController = class GradesController {
    constructor(gradesService) {
        this.gradesService = gradesService;
    }
    async createGrade(createGradeDto) {
        const grade = await this.gradesService.createGrade(createGradeDto);
        return {
            success: true,
            data: grade,
            message: "Grade created successfully",
        };
    }
    async updateGrade(id, updateGradeDto) {
        const grade = await this.gradesService.updateGrade(id, updateGradeDto);
        return {
            success: true,
            data: grade,
            message: "Grade updated successfully",
        };
    }
    async deleteGrade(id) {
        await this.gradesService.deleteGrade(id);
        return {
            success: true,
            message: 'Grade deleted successfully'
        };
    }
    async getStudentGrades(studentId, courseId, semester) {
        const grades = await this.gradesService.getStudentGrades(studentId, { courseId, semester });
        return {
            success: true,
            data: grades,
            message: "Student grades retrieved successfully",
        };
    }
    async getCourseGrades(courseId, evaluationType) {
        const grades = await this.gradesService.getCourseGrades(courseId, { evaluationType });
        return {
            success: true,
            data: grades,
            message: "Course grades retrieved successfully",
        };
    }
    async getTeacherGrades(teacherId, courseId) {
        const grades = await this.gradesService.getTeacherGrades(teacherId, { courseId });
        return {
            success: true,
            data: grades,
            message: "Teacher grades retrieved successfully",
        };
    }
    async getStudentGradeSummary(studentId) {
        const summary = await this.gradesService.getStudentGradeSummary(studentId);
        return {
            success: true,
            data: summary,
            message: 'Student grade summary retrieved successfully'
        };
    }
    async getCourseGradeSummary(courseId) {
        const summary = await this.gradesService.getCourseGradeSummary(courseId);
        return {
            success: true,
            data: summary,
            message: 'Course grade summary retrieved successfully'
        };
    }
};
exports.GradesController = GradesController;
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], GradesController.prototype, "createGrade", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function]),
    __metadata("design:returntype", Promise)
], GradesController.prototype, "updateGrade", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GradesController.prototype, "deleteGrade", null);
__decorate([
    (0, common_1.Get)("student/:studentId"),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Query)('courseId')),
    __param(2, (0, common_1.Query)('semester')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], GradesController.prototype, "getStudentGrades", null);
__decorate([
    (0, common_1.Get)("course/:courseId"),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Query)('evaluationType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], GradesController.prototype, "getCourseGrades", null);
__decorate([
    (0, common_1.Get)("teacher/:teacherId"),
    __param(0, (0, common_1.Param)('teacherId')),
    __param(1, (0, common_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], GradesController.prototype, "getTeacherGrades", null);
__decorate([
    (0, common_1.Get)('student/:studentId/summary'),
    __param(0, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GradesController.prototype, "getStudentGradeSummary", null);
__decorate([
    (0, common_1.Get)('course/:courseId/summary'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GradesController.prototype, "getCourseGradeSummary", null);
exports.GradesController = GradesController = __decorate([
    (0, common_1.Controller)("grades"),
    __metadata("design:paramtypes", [grades_service_1.GradesService])
], GradesController);
//# sourceMappingURL=grades.controller.js.map