import { StudentCourse } from "./student-course.entity";
export declare class Student {
    id: number;
    studentCode: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    grade: string;
    section: string;
    level: string;
    phone: string;
    address: string;
    parentName: string;
    parentPhone: string;
    parentEmail: string;
    isActive: boolean;
    role: string;
    courses: StudentCourse[];
    createdAt: Date;
}
