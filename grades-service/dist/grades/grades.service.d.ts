import { Repository } from "typeorm";
import { Grade } from "./entities/grade.entity";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
export declare class GradesService {
    private readonly gradeRepository;
    constructor(gradeRepository: Repository<Grade>);
    createGrade(createGradeDto: CreateGradeDto): Promise<Grade>;
    updateGrade(id: number, updateGradeDto: UpdateGradeDto): Promise<Grade>;
    deleteGrade(id: number): Promise<void>;
    getStudentGrades(studentId: number, filters: {
        courseId?: number;
        semester?: string;
    }): Promise<Grade[]>;
    getCourseGrades(courseId: number, filters: {
        evaluationType?: string;
    }): Promise<Grade[]>;
    getTeacherGrades(teacherId: number, filters: {
        courseId?: number;
    }): Promise<Grade[]>;
    getStudentGradeSummary(studentId: number): Promise<{
        courses: {
            courseId: number;
            grades: any;
            finalGrade: number;
            totalEvaluations: any;
        }[];
        overallAverage: number;
        totalCourses: number;
    }>;
    getCourseGradeSummary(courseId: number): Promise<{
        students: {
            studentId: number;
            grades: any;
            finalGrade: number;
            totalEvaluations: any;
        }[];
        courseAverage: number;
        totalStudents: number;
        totalEvaluations: number;
    }>;
}
