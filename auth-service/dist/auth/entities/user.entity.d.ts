export declare enum UserRole {
    STUDENT = "student",
    TEACHER = "teacher",
    ADMIN = "admin"
}
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: UserRole;
    code: string;
    grade: string;
    section: string;
    isActive: boolean;
    createdAt: Date;
}
