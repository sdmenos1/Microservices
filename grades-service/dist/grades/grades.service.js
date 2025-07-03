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
exports.GradesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const grade_entity_1 = require("./entities/grade.entity");
let GradesService = class GradesService {
    constructor(gradeRepository) {
        this.gradeRepository = gradeRepository;
    }
    async createGrade(createGradeDto) {
        const grade = this.gradeRepository.create(createGradeDto);
        return await this.gradeRepository.save(grade);
    }
    async updateGrade(id, updateGradeDto) {
        const grade = await this.gradeRepository.findOne({
            where: { id, isActive: true },
        });
        if (!grade) {
            throw new common_1.NotFoundException("Grade not found");
        }
        Object.assign(grade, updateGradeDto);
        return await this.gradeRepository.save(grade);
    }
    async deleteGrade(id) {
        const grade = await this.gradeRepository.findOne({
            where: { id, isActive: true },
        });
        if (!grade) {
            throw new common_1.NotFoundException("Grade not found");
        }
        grade.isActive = false;
        await this.gradeRepository.save(grade);
    }
    async getStudentGrades(studentId, filters) {
        const query = this.gradeRepository
            .createQueryBuilder("grade")
            .where("grade.studentId = :studentId AND grade.isActive = :isActive", {
            studentId,
            isActive: true,
        });
        if (filters.courseId) {
            query.andWhere("grade.courseId = :courseId", { courseId: filters.courseId });
        }
        if (filters.semester) {
            query.andWhere("grade.semester = :semester", { semester: filters.semester });
        }
        query.orderBy("grade.evaluationDate", "DESC");
        return await query.getMany();
    }
    async getCourseGrades(courseId, filters) {
        const query = this.gradeRepository
            .createQueryBuilder("grade")
            .where("grade.courseId = :courseId AND grade.isActive = :isActive", {
            courseId,
            isActive: true,
        });
        if (filters.evaluationType) {
            query.andWhere("grade.evaluationType = :evaluationType", {
                evaluationType: filters.evaluationType,
            });
        }
        query.orderBy("grade.evaluationDate", "DESC");
        return await query.getMany();
    }
    async getTeacherGrades(teacherId, filters) {
        const query = this.gradeRepository
            .createQueryBuilder("grade")
            .where("grade.teacherId = :teacherId AND grade.isActive = :isActive", {
            teacherId,
            isActive: true,
        });
        if (filters.courseId) {
            query.andWhere("grade.courseId = :courseId", { courseId: filters.courseId });
        }
        query.orderBy("grade.evaluationDate", "DESC");
        return await query.getMany();
    }
    async getStudentGradeSummary(studentId) {
        const grades = await this.gradeRepository.find({
            where: { studentId, isActive: true },
        });
        const courseGrades = grades.reduce((acc, grade) => {
            if (!acc[grade.courseId]) {
                acc[grade.courseId] = [];
            }
            acc[grade.courseId].push(grade);
            return acc;
        }, {});
        const summary = Object.keys(courseGrades).map((courseId) => {
            const courseGradeList = courseGrades[courseId];
            const totalWeightedScore = courseGradeList.reduce((sum, grade) => {
                return sum + (grade.score * grade.weight) / 100;
            }, 0);
            const totalWeight = courseGradeList.reduce((sum, grade) => sum + grade.weight, 0);
            const finalGrade = totalWeight > 0 ? (totalWeightedScore * 100) / totalWeight : 0;
            return {
                courseId: Number.parseInt(courseId),
                grades: courseGradeList,
                finalGrade: Math.round(finalGrade * 100) / 100,
                totalEvaluations: courseGradeList.length,
            };
        });
        const overallAverage = summary.length > 0 ? summary.reduce((sum, course) => sum + course.finalGrade, 0) / summary.length : 0;
        return {
            courses: summary,
            overallAverage: Math.round(overallAverage * 100) / 100,
            totalCourses: summary.length,
        };
    }
    async getCourseGradeSummary(courseId) {
        const grades = await this.gradeRepository.find({
            where: { courseId, isActive: true },
        });
        const studentGrades = grades.reduce((acc, grade) => {
            if (!acc[grade.studentId]) {
                acc[grade.studentId] = [];
            }
            acc[grade.studentId].push(grade);
            return acc;
        }, {});
        const summary = Object.keys(studentGrades).map((studentId) => {
            const studentGradeList = studentGrades[studentId];
            const totalWeightedScore = studentGradeList.reduce((sum, grade) => {
                return sum + (grade.score * grade.weight) / 100;
            }, 0);
            const totalWeight = studentGradeList.reduce((sum, grade) => sum + grade.weight, 0);
            const finalGrade = totalWeight > 0 ? (totalWeightedScore * 100) / totalWeight : 0;
            return {
                studentId: Number.parseInt(studentId),
                grades: studentGradeList,
                finalGrade: Math.round(finalGrade * 100) / 100,
                totalEvaluations: studentGradeList.length,
            };
        });
        const courseAverage = summary.length > 0 ? summary.reduce((sum, student) => sum + student.finalGrade, 0) / summary.length : 0;
        return {
            students: summary,
            courseAverage: Math.round(courseAverage * 100) / 100,
            totalStudents: summary.length,
            totalEvaluations: grades.length,
        };
    }
};
exports.GradesService = GradesService;
exports.GradesService = GradesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(grade_entity_1.Grade)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GradesService);
//# sourceMappingURL=grades.service.js.map