import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from "typeorm"
import { StudentCourse } from "./student-course.entity"

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  code: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  teacherId: number

  @Column()
  teacherName: string

  @Column()
  grade: string

  @Column()
  section: string

  @Column()
  level: string

  @Column()
  credits: number

  @Column()
  classroom: string

  @Column({ default: true })
  isActive: boolean

  @OneToMany(
    () => StudentCourse,
    (studentCourse) => studentCourse.course,
  )
  students: StudentCourse[]

  @CreateDateColumn()
  createdAt: Date
}
