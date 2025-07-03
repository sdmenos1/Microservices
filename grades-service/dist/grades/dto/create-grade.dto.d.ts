export declare class CreateGradeDto {
    studentId: number;
    courseId: number;
    teacherId: number;
    evaluationType: string;
    title: string;
    score: number;
    maxScore: number;
    weight?: number;
    evaluationDate: string;
    description?: string;
    academicYear: string;
    semester: string;
}
