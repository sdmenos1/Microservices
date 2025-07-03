import { Student } from "./student.entity";
import { Course } from "./course.entity";
export declare class StudentCourse {
    id: number;
    studentId: number;
    courseId: number;
    academicYear: string;
    semester: string;
    isActive: boolean;
    student: Student;
    course: Course;
    createdAt: Date;
}
