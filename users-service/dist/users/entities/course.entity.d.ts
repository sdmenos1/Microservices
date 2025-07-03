import { StudentCourse } from "./student-course.entity";
export declare class Course {
    id: number;
    code: string;
    name: string;
    description: string;
    teacherId: number;
    teacherName: string;
    grade: string;
    section: string;
    level: string;
    credits: number;
    classroom: string;
    isActive: boolean;
    students: StudentCourse[];
    createdAt: Date;
}
