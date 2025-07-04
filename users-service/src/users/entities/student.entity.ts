import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm"

@Entity("students")
export class Student {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  studentCode: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  dateOfBirth: string

  @Column()
  grade: string

  @Column()
  section: string

  @Column({ nullable: true })
  level: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  address: string

  @Column({ nullable: true })
  parentName: string

  @Column({ nullable: true })
  parentPhone: string

  @Column({ nullable: true })
  parentEmail: string

  @Column({ default: true })
  isActive: boolean

  @Column({ default: 'student' })
  role: string

  @CreateDateColumn()
  createdAt: Date
}
