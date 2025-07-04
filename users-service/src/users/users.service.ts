import { In } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "./entities/student.entity";
import { Teacher } from "./entities/teacher.entity";
import { CreateStudentDto } from "./dto/create-student.dto";
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { lastValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly httpService: HttpService,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async getStudentById(id: number) {
    const student = await this.studentRepository.findOne({
      where: { id, isActive: true },
    })

    if (!student) {
      throw new NotFoundException("Student not found")
    }

    return student
  }

  async getTeacherById(id: number) {
    const teacher = await this.teacherRepository.findOne({
      where: { id, isActive: true },
    });
  
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
  
    return teacher;
  }

  async validateTeacherLogin(email: string, password: string) {
    console.log('🔍 Buscando teacher con email:', email);
  
    const teacher = await this.teacherRepository.findOne({
      where: { email, isActive: true },
    });
  
    if (!teacher) {
      console.log('❌ Profesor no encontrado');
      throw new UnauthorizedException('Teacher not found');
    }
  
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      console.log('❌ Contraseña incorrecta para:', email);
      throw new UnauthorizedException('Invalid password');
    }
  
    console.log('✅ Profesor autenticado:', teacher.email);
  
    return {
      id: teacher.id,
      email: teacher.email,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      specialization: teacher.specialization,
      role: teacher.role,
    };
  }

  async validateStudentLogin(email: string, password: string) {
    console.log('🔍 Buscando estudiante con email:', email);
  
    const student = await this.studentRepository.findOne({
      where: { email, isActive: true },
    });
  
    if (!student) {
      console.log('❌ Estudiante no encontrado en DB');
      throw new UnauthorizedException('Student not found');
    }
  
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      console.log('❌ Contraseña inválida para:', email);
      throw new UnauthorizedException('Invalid password');
    }
  
    console.log('✅ Estudiante autenticado:', student.email);
    
    return {
      id: student.id,
      email: student.email,
      firstName: student.firstName,
      lastName: student.lastName,
      grade: student.grade,
      section: student.section,
      studentCode: student.studentCode,
      role: student.role,
    };
  }
  
      async createStudent(dto: CreateStudentDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10); // ✅ hasheamos
      
        const student = this.studentRepository.create({
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          password: hashedPassword, // ✅ guardamos el hash, no el texto plano
          dateOfBirth: dto.dateOfBirth,
          grade: dto.grade,
          section: dto.section,
          studentCode: dto.studentCode,
          phone: dto.phone,
          address: dto.address,
          parentName: dto.parentName,
          parentPhone: dto.parentPhone,
          parentEmail: dto.parentEmail,
          isActive: true,
          role: "student",
        });
      
        return await this.studentRepository.save(student);
      }
      
  
      async createTeacher(dto: CreateTeacherDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const teacher = this.teacherRepository.create({
          ...dto,
          password: hashedPassword,
          role: 'teacher',
          isActive: true,
        });
        return await this.teacherRepository.save(teacher);
      }
      
  
  async getStudents(filters: {
    grade?: string
    section?: string
    level?: string
    search?: string
  }) {
    const query = this.studentRepository
      .createQueryBuilder("student")
      .where("student.isActive = :isActive", { isActive: true })

    if (filters.grade) {
      query.andWhere("student.grade = :grade", { grade: filters.grade })
    }

    if (filters.section) {
      query.andWhere("student.section = :section", { section: filters.section })
    }

    if (filters.level) {
      query.andWhere("student.level = :level", { level: filters.level })
    }

    if (filters.search) {
      query.andWhere("(student.firstName LIKE :search OR student.lastName LIKE :search OR student.code LIKE :search OR student.email LIKE :search)", {
        search: `%${filters.search}%`,
      })
    }

    return await query.getMany()
  }
  async getTeachers(){
    return await this.teacherRepository.find({where:{isActive:true},select:['id','firstName','lastName','email','phone','specialization']});
  }
  // users.service.ts (users-service)
  async getStudentCourses(studentId: number) {
    // Asegurarse de que el estudiante existe
    await this.getStudentById(studentId);
  
    try {
      const response = await lastValueFrom(
        this.httpService.get(`http://courses-service/courses/student/${studentId}`)
      );
      return response.data.data; // porque tu courses-service devuelve { success, data, message }
    } catch (err) {
      throw new NotFoundException(`Courses not found for student ${studentId}`);
    }
  }

}