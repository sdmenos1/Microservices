// Extraído del users-service, parte relacionada a cursos y asignaciones

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Course } from "./entity/course.entity";
import { StudentCourse } from "./entity/student-course.entity";
import { CreateCourseDto } from "./dto/create-course.dto";
import { AssignCourseDto } from "./dto/assing-course.dto";
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs'; // para convertir Observable a Promise
import { NotFoundException } from "@nestjs/common";
@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
      
        @InjectRepository(StudentCourse)
        private readonly studentCourseRepository: Repository<StudentCourse>,
      
        private readonly httpService: HttpService, // 👈 AÑADIR ESTO
      ) {}      
      // course.service.ts
async getAllCourses() {
    return await this.courseRepository.find({
      where: { isActive: true },
      order: { id: 'ASC' }, // opcional
    });
  }
  
      async createCourse(dto: CreateCourseDto) {
        await this.validateTeacherExists(dto.teacherId);
      
        const course = this.courseRepository.create({ ...dto, isActive: true });
        return await this.courseRepository.save(course);
      }
      
      async assignCourseToStudent(dto: AssignCourseDto) {
        await this.validateStudentExists(dto.studentId);
      
        const assignment = this.studentCourseRepository.create({
          studentId: dto.studentId,
          courseId: dto.courseId,
          academicYear: dto.academicYear,
          semester: dto.semester,
          isActive: true,
        });
      
        return await this.studentCourseRepository.save(assignment);
      }
      

  // courses.service.ts
private async validateStudentExists(studentId: number): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`http://users-service/students/${studentId}`)
      )
      if (!response.data?.id) {
        throw new NotFoundException(`Student with ID ${studentId} not found`)
      }
    } catch (err) {
      throw new NotFoundException(`Student with ID ${studentId} not found`)
    }
  }
  
  private async validateTeacherExists(teacherId: number): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`http://users-service/teachers/${teacherId}`)
      )
      if (!response.data?.id) {
        throw new NotFoundException(`Teacher with ID ${teacherId} not found`)
      }
    } catch (err) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`)
    }
  }
  
  async getStudentCourses(studentId: number) {
    // Validar existencia del estudiante
    await this.validateStudentExists(studentId);
  
    const studentCourses = await this.studentCourseRepository.find({
      where: { studentId, isActive: true },
      relations: ["course"],
    });
  
    return studentCourses.map((sc) => ({
      id: sc.course.id,
      code: sc.course.code,
      name: sc.course.name,
      description: sc.course.description,
      teacherName: sc.course.teacherName,
      credits: sc.course.credits,
      classroom: sc.course.classroom,
      academicYear: sc.academicYear,
      semester: sc.semester,
    }));
  }
  

  async getStudentsByCourse(courseId: number): Promise<any[]> {
    const course = await this.courseRepository.findOne({ where: { id: courseId, isActive: true } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
  
    const studentCourses = await this.studentCourseRepository.find({
      where: { courseId, isActive: true },
    });
  
    const students = await Promise.all(
      studentCourses.map(async (sc) => {
        try {
          const response = await lastValueFrom(
            this.httpService.get(`http://users-service/students/${sc.studentId}`)
          );
          return response.data;
        } catch {
          return null;
        }
      })
    );
  
    return students.filter(Boolean);
  }
  
  

  // courses.service.ts
  async getStudentsByTeacher(teacherId: number): Promise<any[]> {
    await this.validateTeacherExists(teacherId); // 👈
  
    const courses = await this.courseRepository.find({
      where: { teacherId, isActive: true },
    });
  
    const courseIds = courses.map((course) => course.id);
    if (!courseIds.length) return [];
  
    const studentCourses = await this.studentCourseRepository.find({
      where: { courseId: In(courseIds), isActive: true },
    });
  
    const studentIds = [...new Set(studentCourses.map((sc) => sc.studentId))];
  
    const students = await Promise.all(
      studentIds.map(async (id) => {
        try {
          const response = await lastValueFrom(
            this.httpService.get(`http://users-service/students/${id}`)
          );
          return response.data;
        } catch (e) {
          return null;
        }
      })
    );
  
    return students.filter(Boolean);
  }  
}
