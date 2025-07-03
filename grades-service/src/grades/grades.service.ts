import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Grade } from "./entities/grade.entity";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
    private readonly httpService: HttpService,
  ) {}

  async createGrade(createGradeDto: CreateGradeDto) {
    // Validación remota
    await this.validateUserExists('', createGradeDto.studentId, 'Student'); // students/:id
    await this.validateUserExists('teachers', createGradeDto.teacherId, 'Teacher'); // students/teachers/:id
  
    const grade = this.gradeRepository.create(createGradeDto);
    return await this.gradeRepository.save(grade);
  }
  

  private async validateUserExists(endpoint: string, id: number, userType: 'Student' | 'Teacher') {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`http://localhost:3002/students/${endpoint}/${id}`),
      );
      return response.data?.data;
    } catch (error) {
      throw new NotFoundException(`${userType} with ID ${id} not found`);
    }
  }

  async updateGrade(id: number, updateGradeDto: UpdateGradeDto) {
    const grade = await this.gradeRepository.findOne({
      where: { id, isActive: true },
    })

    if (!grade) {
      throw new NotFoundException("Grade not found")
    }

    Object.assign(grade, updateGradeDto)
    return await this.gradeRepository.save(grade)
  }

  async deleteGrade(id: number) {
    const grade = await this.gradeRepository.findOne({
      where: { id, isActive: true },
    })

    if (!grade) {
      throw new NotFoundException("Grade not found")
    }

    grade.isActive = false
    await this.gradeRepository.save(grade)
  }

  async getStudentGrades(studentId: number, filters: { courseId?: number; semester?: string }) {
    const query = this.gradeRepository
      .createQueryBuilder("grade")
      .where("grade.studentId = :studentId AND grade.isActive = :isActive", {
        studentId,
        isActive: true,
      })

    if (filters.courseId) {
      query.andWhere("grade.courseId = :courseId", { courseId: filters.courseId })
    }

    if (filters.semester) {
      query.andWhere("grade.semester = :semester", { semester: filters.semester })
    }

    query.orderBy("grade.evaluationDate", "DESC")

    return await query.getMany()
  }

  async getCourseGrades(courseId: number, filters: { evaluationType?: string }) {
    const query = this.gradeRepository
      .createQueryBuilder("grade")
      .where("grade.courseId = :courseId AND grade.isActive = :isActive", {
        courseId,
        isActive: true,
      })

    if (filters.evaluationType) {
      query.andWhere("grade.evaluationType = :evaluationType", {
        evaluationType: filters.evaluationType,
      })
    }

    query.orderBy("grade.evaluationDate", "DESC")

    return await query.getMany()
  }

  async getTeacherGrades(teacherId: number, filters: { courseId?: number }) {
    const query = this.gradeRepository
      .createQueryBuilder("grade")
      .where("grade.teacherId = :teacherId AND grade.isActive = :isActive", {
        teacherId,
        isActive: true,
      })

    if (filters.courseId) {
      query.andWhere("grade.courseId = :courseId", { courseId: filters.courseId })
    }

    query.orderBy("grade.evaluationDate", "DESC")

    return await query.getMany()
  }

  async getStudentGradeSummary(studentId: number) {
    const grades = await this.gradeRepository.find({
      where: { studentId, isActive: true },
    })

    const courseGrades = grades.reduce((acc, grade) => {
      if (!acc[grade.courseId]) {
        acc[grade.courseId] = []
      }
      acc[grade.courseId].push(grade)
      return acc
    }, {})

    const summary = Object.keys(courseGrades).map((courseId) => {
      const courseGradeList = courseGrades[courseId]
      const totalWeightedScore = courseGradeList.reduce((sum, grade) => {
        return sum + (grade.score * grade.weight) / 100
      }, 0)

      const totalWeight = courseGradeList.reduce((sum, grade) => sum + grade.weight, 0)
      const finalGrade = totalWeight > 0 ? (totalWeightedScore * 100) / totalWeight : 0

      return {
        courseId: Number.parseInt(courseId),
        grades: courseGradeList,
        finalGrade: Math.round(finalGrade * 100) / 100,
        totalEvaluations: courseGradeList.length,
      }
    })

    const overallAverage =
      summary.length > 0 ? summary.reduce((sum, course) => sum + course.finalGrade, 0) / summary.length : 0

    return {
      courses: summary,
      overallAverage: Math.round(overallAverage * 100) / 100,
      totalCourses: summary.length,
    }
  }

  async getCourseGradeSummary(courseId: number) {
    const grades = await this.gradeRepository.find({
      where: { courseId, isActive: true },
    })

    const studentGrades = grades.reduce((acc, grade) => {
      if (!acc[grade.studentId]) {
        acc[grade.studentId] = []
      }
      acc[grade.studentId].push(grade)
      return acc
    }, {})

    const summary = Object.keys(studentGrades).map((studentId) => {
      const studentGradeList = studentGrades[studentId]
      const totalWeightedScore = studentGradeList.reduce((sum, grade) => {
        return sum + (grade.score * grade.weight) / 100
      }, 0)

      const totalWeight = studentGradeList.reduce((sum, grade) => sum + grade.weight, 0)
      const finalGrade = totalWeight > 0 ? (totalWeightedScore * 100) / totalWeight : 0

      return {
        studentId: Number.parseInt(studentId),
        grades: studentGradeList,
        finalGrade: Math.round(finalGrade * 100) / 100,
        totalEvaluations: studentGradeList.length,
      }
    })

    const courseAverage =
      summary.length > 0 ? summary.reduce((sum, student) => sum + student.finalGrade, 0) / summary.length : 0

    return {
      students: summary,
      courseAverage: Math.round(courseAverage * 100) / 100,
      totalStudents: summary.length,
      totalEvaluations: grades.length,
    }
  }
}
