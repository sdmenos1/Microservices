import { Repository } from "typeorm";
import { Student } from "./entities/student.entity";
import { Course } from "./entities/course.entity";
import { StudentCourse } from "./entities/student-course.entity";
import { Teacher } from "./entities/teacher.entity";
import { CreateStudentDto } from "./dto/create-student.dto";
import { CreateCourseDto } from "./dto/create-course.dto";
import { AssignCourseDto } from "./dto/assing-course.dto";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
export declare class StudentsService {
    private readonly studentRepository;
    private readonly courseRepository;
    private readonly studentCourseRepository;
    private readonly teacherRepository;
    constructor(studentRepository: Repository<Student>, courseRepository: Repository<Course>, studentCourseRepository: Repository<StudentCourse>, teacherRepository: Repository<Teacher>);
    getStudentById(id: number): Promise<Student>;
    getTeacherById(id: number): Promise<Teacher>;
    getStudentCourses(studentId: number): Promise<{
        id: number;
        code: string;
        name: string;
        description: string;
        teacherName: string;
        credits: number;
        classroom: string;
        academicYear: string;
        semester: string;
    }[]>;
    validateTeacherLogin(email: string, password: string): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        specialization: string;
        role: string;
    }>;
    validateStudentLogin(email: string, password: string): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        grade: string;
        section: string;
        studentCode: string;
        role: string;
    }>;
    createCourse(dto: CreateCourseDto): Promise<Course>;
    assignCourseToStudent(dto: AssignCourseDto): Promise<StudentCourse>;
    getStudentsByCourse(courseId: number): Promise<{
        id: number;
        studentCode: string;
        name: string;
        email: string;
        phone: string;
        grade: string;
        section: string;
        level: string;
    }[]>;
    getStudentsByTeacher(teacherId: number): Promise<{
        id: number;
        studentCode: string;
        name: string;
        email: string;
        phone: string;
        grade: string;
        section: string;
        level: string;
        course: {
            id: number;
            name: string;
            code: string;
        };
    }[]>;
    createStudent(dto: CreateStudentDto): Promise<Student>;
    createTeacher(dto: CreateTeacherDto): Promise<Teacher>;
    getStudents(filters: {
        grade?: string;
        section?: string;
        level?: string;
        search?: string;
    }): Promise<Student[]>;
    getTeachers(): Promise<Teacher[]>;
}
