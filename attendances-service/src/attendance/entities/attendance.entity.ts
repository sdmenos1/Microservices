import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('attendance')
@Index(['studentId', 'courseId', 'date'], { unique: true })
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentId: number;

  @Column()
  courseId: number;

  @Column()
  teacherId: number;

  @Column({ type: 'date' })
  date: string;

  @Column({
    type: 'enum',
    enum: ['present', 'absent', 'late', 'excused'],
  })
  status: string;

  @Column({ nullable: true })
  notes: string;

  @Column()
  academicYear: string;

  @Column()
  semester: string;

  @CreateDateColumn()
  createdAt: Date;
}
