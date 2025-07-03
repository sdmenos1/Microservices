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
exports.StudentsService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const typeorm_3 = require("typeorm");
const student_entity_1 = require("./entities/student.entity");
const course_entity_1 = require("./entities/course.entity");
const student_course_entity_1 = require("./entities/student-course.entity");
const teacher_entity_1 = require("./entities/teacher.entity");
const bcrypt = require("bcrypt");
const common_2 = require("@nestjs/common");
let StudentsService = class StudentsService {
    constructor(studentRepository, courseRepository, studentCourseRepository, teacherRepository) {
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.studentCourseRepository = studentCourseRepository;
        this.teacherRepository = teacherRepository;
    }
    async getStudentById(id) {
        const student = await this.studentRepository.findOne({
            where: { id, isActive: true },
        });
        if (!student) {
            throw new common_1.NotFoundException("Student not found");
        }
        return student;
    }
    async getTeacherById(id) {
        const teacher = await this.teacherRepository.findOne({
            where: { id, isActive: true },
        });
        if (!teacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        return teacher;
    }
    async getStudentCourses(studentId) {
        const studentCourses = await this.studentCourseRepository.find({
            where: { studentId, isActive: true },
            relations: ["course"],
        });
        return studentCourses.map((sc) => ({
            id: sc.course.id,
            code: sc.course.code,
            name: sc.course.name,
            description: sc.course.description,
            teacherName: sc.course.teacherName,
            credits: sc.course.credits,
            classroom: sc.course.classroom,
            academicYear: sc.academicYear,
            semester: sc.semester,
        }));
    }
    async validateTeacherLogin(email, password) {
        console.log('🔍 Buscando teacher con email:', email);
        const teacher = await this.teacherRepository.findOne({
            where: { email, isActive: true },
        });
        if (!teacher) {
            console.log('❌ Profesor no encontrado');
            throw new common_2.UnauthorizedException('Teacher not found');
        }
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            console.log('❌ Contraseña incorrecta para:', email);
            throw new common_2.UnauthorizedException('Invalid password');
        }
        console.log('✅ Profesor autenticado:', teacher.email);
        return {
            id: teacher.id,
            email: teacher.email,
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            specialization: teacher.specialization,
            role: teacher.role,
        };
    }
    async validateStudentLogin(email, password) {
        console.log('🔍 Buscando estudiante con email:', email);
        const student = await this.studentRepository.findOne({
            where: { email, isActive: true },
        });
        if (!student) {
            console.log('❌ Estudiante no encontrado en DB');
            throw new common_2.UnauthorizedException('Student not found');
        }
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            console.log('❌ Contraseña inválida para:', email);
            throw new common_2.UnauthorizedException('Invalid password');
        }
        console.log('✅ Estudiante autenticado:', student.email);
        return {
            id: student.id,
            email: student.email,
            firstName: student.firstName,
            lastName: student.lastName,
            grade: student.grade,
            section: student.section,
            studentCode: student.studentCode,
            role: student.role,
        };
    }
    async createCourse(dto) {
        const course = this.courseRepository.create({ ...dto, isActive: true });
        return await this.courseRepository.save(course);
    }
    async assignCourseToStudent(dto) {
        const assignment = this.studentCourseRepository.create({
            studentId: dto.studentId,
            courseId: dto.courseId,
            academicYear: dto.academicYear,
            semester: dto.semester,
            isActive: true,
        });
        return await this.studentCourseRepository.save(assignment);
    }
    async getStudentsByCourse(courseId) {
        const studentCourses = await this.studentCourseRepository.find({
            where: { courseId, isActive: true },
            relations: ["student"],
        });
        return studentCourses.map((sc) => ({
            id: sc.student.id,
            studentCode: sc.student.studentCode,
            name: `${sc.student.firstName} ${sc.student.lastName}`,
            email: sc.student.email,
            phone: sc.student.phone,
            grade: sc.student.grade,
            section: sc.student.section,
            level: sc.student.level,
        }));
    }
    async getStudentsByTeacher(teacherId) {
        const courses = await this.courseRepository.find({
            where: { teacherId, isActive: true },
        });
        const courseIds = courses.map((c) => c.id);
        const studentCourses = await this.studentCourseRepository.find({
            where: {
                courseId: (0, typeorm_1.In)(courseIds.length > 0 ? courseIds : [-1]),
                isActive: true,
            },
            relations: ["student", "course"],
        });
        return studentCourses.map((sc) => ({
            id: sc.student.id,
            studentCode: sc.student.studentCode,
            name: `${sc.student.firstName} ${sc.student.lastName}`,
            email: sc.student.email,
            phone: sc.student.phone,
            grade: sc.student.grade,
            section: sc.student.section,
            level: sc.student.level,
            course: {
                id: sc.course.id,
                name: sc.course.name,
                code: sc.course.code,
            },
        }));
    }
    async createStudent(dto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const student = this.studentRepository.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            password: hashedPassword,
            dateOfBirth: dto.dateOfBirth,
            grade: dto.grade,
            section: dto.section,
            studentCode: dto.studentCode,
            phone: dto.phone,
            address: dto.address,
            parentName: dto.parentName,
            parentPhone: dto.parentPhone,
            parentEmail: dto.parentEmail,
            isActive: true,
            role: "student",
        });
        return await this.studentRepository.save(student);
    }
    async createTeacher(dto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const teacher = this.teacherRepository.create({
            ...dto,
            password: hashedPassword,
            role: 'teacher',
            isActive: true,
        });
        return await this.teacherRepository.save(teacher);
    }
    async getStudents(filters) {
        const query = this.studentRepository
            .createQueryBuilder("student")
            .where("student.isActive = :isActive", { isActive: true });
        if (filters.grade) {
            query.andWhere("student.grade = :grade", { grade: filters.grade });
        }
        if (filters.section) {
            query.andWhere("student.section = :section", { section: filters.section });
        }
        if (filters.level) {
            query.andWhere("student.level = :level", { level: filters.level });
        }
        if (filters.search) {
            query.andWhere("(student.firstName LIKE :search OR student.lastName LIKE :search OR student.code LIKE :search OR student.email LIKE :search)", {
                search: `%${filters.search}%`,
            });
        }
        return await query.getMany();
    }
    async getTeachers() {
        return await this.teacherRepository.find({ where: { isActive: true }, select: ['id', 'firstName', 'lastName', 'email', 'phone', 'specialization'] });
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_2.InjectRepository)(course_entity_1.Course)),
    __param(2, (0, typeorm_2.InjectRepository)(student_course_entity_1.StudentCourse)),
    __param(3, (0, typeorm_2.InjectRepository)(teacher_entity_1.Teacher)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository])
], StudentsService);
function createStudent(dto, dtoClass) {
}
//# sourceMappingURL=users.service.js.map