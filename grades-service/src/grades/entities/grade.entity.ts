import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("grades")
export class Grade {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  studentId: number

  @Column()
  courseId: number

  @Column()
  teacherId: number

  @Column()
  evaluationType: string // examen, tarea, proyecto, participacion

  @Column()
  title: string

  @Column("decimal", { precision: 4, scale: 2 })
  score: number

  @Column("decimal", { precision: 4, scale: 2 })
  maxScore: number

  @Column("decimal", { precision: 4, scale: 2, default: 0 })
  weight: number // Peso de la evaluación en %

  @Column({ type: "date" })
  evaluationDate: string

  @Column({ nullable: true })
  description: string

  @Column()
  academicYear: string

  @Column()
  semester: string

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
