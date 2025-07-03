import { StudentsService } from "./users.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { CreateCourseDto } from "./dto/create-course.dto";
import { AssignCourseDto } from "./dto/assing-course.dto";
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    getStudents(grade?: string, section?: string, level?: string, search?: string): Promise<{
        success: boolean;
        data: import("./entities/student.entity").Student[];
        message: string;
    }>;
    getAllTeachers(): Promise<{
        success: boolean;
        data: import("./entities/teacher.entity").Teacher[];
        message: string;
    }>;
    getStudent(id: number): Promise<{
        success: boolean;
        data: import("./entities/student.entity").Student;
        message: string;
    }>;
    getTeacher(id: number): Promise<{
        success: boolean;
        data: import("./entities/teacher.entity").Teacher;
        message: string;
    }>;
    validateStudentLogin(body: {
        email: string;
        password: string;
    }): Promise<{
        success: boolean;
        data: {
            id: number;
            email: string;
            firstName: string;
            lastName: string;
            grade: string;
            section: string;
            studentCode: string;
            role: string;
        };
        message: string;
    }>;
    validateTeacherLogin(body: {
        email: string;
        password: string;
    }): Promise<{
        success: boolean;
        data: {
            id: number;
            email: string;
            firstName: string;
            lastName: string;
            specialization: string;
            role: string;
        };
        message: string;
    }>;
    getStudentCourses(id: number): Promise<{
        success: boolean;
        data: {
            id: number;
            code: string;
            name: string;
            description: string;
            teacherName: string;
            credits: number;
            classroom: string;
            academicYear: string;
            semester: string;
        }[];
        message: string;
    }>;
    getStudentsByCourse(courseId: number): Promise<{
        success: boolean;
        data: {
            id: number;
            studentCode: string;
            name: string;
            email: string;
            phone: string;
            grade: string;
            section: string;
            level: string;
        }[];
        message: string;
    }>;
    createStudent(createStudentDto: CreateStudentDto): Promise<{
        success: boolean;
        data: import("./entities/student.entity").Student;
        message: string;
    }>;
    createCourse(dto: CreateCourseDto): Promise<{
        success: boolean;
        data: import("./entities/course.entity").Course;
        message: string;
    }>;
    assignCourse(dto: AssignCourseDto): Promise<{
        success: boolean;
        data: import("./entities/student-course.entity").StudentCourse;
        message: string;
    }>;
    createTeacher(createTeacherDto: CreateTeacherDto): Promise<{
        success: boolean;
        data: import("./entities/teacher.entity").Teacher;
        message: string;
    }>;
    getStudentsByTeacher(teacherId: number): Promise<{
        success: boolean;
        data: {
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
        }[];
        message: string;
    }>;
}
