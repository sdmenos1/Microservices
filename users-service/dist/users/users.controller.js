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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_student_dto_1 = require("./dto/create-student.dto");
const create_teacher_dto_1 = require("./dto/create-teacher.dto");
const create_course_dto_1 = require("./dto/create-course.dto");
const assing_course_dto_1 = require("./dto/assing-course.dto");
let StudentsController = class StudentsController {
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    async getStudents(grade, section, level, search) {
        const students = await this.studentsService.getStudents({
            grade,
            section,
            level,
            search
        });
        return {
            success: true,
            data: students,
            message: "Students retrieved successfully",
        };
    }
    async getAllTeachers() {
        const teachers = await this.studentsService.getTeachers();
        return {
            success: true,
            data: teachers,
            message: 'Teachers retrieved successfully',
        };
    }
    async getStudent(id) {
        const student = await this.studentsService.getStudentById(id);
        return {
            success: true,
            data: student,
            message: "Student retrieved successfully",
        };
    }
    async getTeacher(id) {
        const teacher = await this.studentsService.getTeacherById(id);
        return {
            success: true,
            data: teacher,
            message: 'Teacher retrieved successfully',
        };
    }
    async validateStudentLogin(body) {
        const student = await this.studentsService.validateStudentLogin(body.email, body.password);
        return {
            success: true,
            data: student,
            message: "Login successful",
        };
    }
    async validateTeacherLogin(body) {
        const teacher = await this.studentsService.validateTeacherLogin(body.email, body.password);
        return {
            success: true,
            data: teacher,
            message: "Login successful",
        };
    }
    async getStudentCourses(id) {
        const courses = await this.studentsService.getStudentCourses(id);
        return {
            success: true,
            data: courses,
            message: "Student courses retrieved successfully",
        };
    }
    async getStudentsByCourse(courseId) {
        const students = await this.studentsService.getStudentsByCourse(courseId);
        return {
            success: true,
            data: students,
            message: "Students retrieved successfully",
        };
    }
    async createStudent(createStudentDto) {
        const student = await this.studentsService.createStudent(createStudentDto);
        return {
            success: true,
            data: student,
            message: "Student created successfully",
        };
    }
    async createCourse(dto) {
        const course = await this.studentsService.createCourse(dto);
        return {
            success: true,
            data: course,
            message: "Course created successfully",
        };
    }
    async assignCourse(dto) {
        const studentCourse = await this.studentsService.assignCourseToStudent(dto);
        return {
            success: true,
            data: studentCourse,
            message: "Course assigned to student successfully",
        };
    }
    async createTeacher(createTeacherDto) {
        const teacher = await this.studentsService.createTeacher(createTeacherDto);
        return {
            success: true,
            data: teacher,
            message: "Teacher created successfully",
        };
    }
    async getStudentsByTeacher(teacherId) {
        const students = await this.studentsService.getStudentsByTeacher(teacherId);
        return {
            success: true,
            data: students,
            message: "Students retrieved successfully",
        };
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('grade')),
    __param(1, (0, common_1.Query)('section')),
    __param(2, (0, common_1.Query)('level')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudents", null);
__decorate([
    (0, common_1.Get)('teachers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getAllTeachers", null);
__decorate([
    (0, common_1.Get)(":id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudent", null);
__decorate([
    (0, common_1.Get)('teachers/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getTeacher", null);
__decorate([
    (0, common_1.Post)("validate-login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "validateStudentLogin", null);
__decorate([
    (0, common_1.Post)("teachers/validate-login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "validateTeacherLogin", null);
__decorate([
    (0, common_1.Get)(":id/courses"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudentCourses", null);
__decorate([
    (0, common_1.Get)("by-course/:courseId"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudentsByCourse", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "createStudent", null);
__decorate([
    (0, common_1.Post)("courses"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Post)("student-courses"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assing_course_dto_1.AssignCourseDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "assignCourse", null);
__decorate([
    (0, common_1.Post)("/teachers"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_teacher_dto_1.CreateTeacherDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "createTeacher", null);
__decorate([
    (0, common_1.Get)("by-teacher/:teacherId"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudentsByTeacher", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.Controller)("students"),
    __metadata("design:paramtypes", [users_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=users.controller.js.map