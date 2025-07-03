import { GradesService } from "./grades.service";
import type { CreateGradeDto } from "./dto/create-grade.dto";
import type { UpdateGradeDto } from "./dto/update-grade.dto";
export declare class GradesController {
    private readonly gradesService;
    constructor(gradesService: GradesService);
    createGrade(createGradeDto: CreateGradeDto): Promise<{
        success: boolean;
        data: import("./entities/grade.entity").Grade;
        message: string;
    }>;
    updateGrade(id: number, updateGradeDto: UpdateGradeDto): Promise<{
        success: boolean;
        data: import("./entities/grade.entity").Grade;
        message: string;
    }>;
    deleteGrade(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    getStudentGrades(studentId: number, courseId?: number, semester?: string): Promise<{
        success: boolean;
        data: import("./entities/grade.entity").Grade[];
        message: string;
    }>;
    getCourseGrades(courseId: number, evaluationType?: string): Promise<{
        success: boolean;
        data: import("./entities/grade.entity").Grade[];
        message: string;
    }>;
    getTeacherGrades(teacherId: number, courseId?: number): Promise<{
        success: boolean;
        data: import("./entities/grade.entity").Grade[];
        message: string;
    }>;
    getStudentGradeSummary(studentId: number): Promise<{
        success: boolean;
        data: {
            courses: {
                courseId: number;
                grades: any;
                finalGrade: number;
                totalEvaluations: any;
            }[];
            overallAverage: number;
            totalCourses: number;
        };
        message: string;
    }>;
    getCourseGradeSummary(courseId: number): Promise<{
        success: boolean;
        data: {
            students: {
                studentId: number;
                grades: any;
                finalGrade: number;
                totalEvaluations: any;
            }[];
            courseAverage: number;
            totalStudents: number;
            totalEvaluations: number;
        };
        message: string;
    }>;
}
