import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm"
import { Course } from "./course.entity"

@Entity("student_courses")
export class StudentCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentId: number; 

  @Column()
  courseId: number;

  @Column()
  academicYear: string;

  @Column()
  semester: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Course, (course) => course.students)
  @JoinColumn({ name: "courseId" })
  course: Course;

  @CreateDateColumn()
  createdAt: Date;
}
