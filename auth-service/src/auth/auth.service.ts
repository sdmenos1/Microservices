import { Injectable, UnauthorizedException, type OnModuleInit } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import { User } from "./entities/user.entity"
import { LoginDto } from "./dto/login.dto"
import { HttpService } from '@nestjs/axios';
import { UserRole } from "./entities/user.entity"
import axios from "axios"
@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}
  

  async onModuleInit() {
    await this.seedUsers()
  }

  private async seedUsers() {
    const userCount = await this.userRepository.count()
    if (userCount === 0) {
      console.log("🌱 Seeding users...")

      const hashedPassword = await bcrypt.hash("123456", 10)

      const users = [
        // Estudiantes
        {
          email: "carlos.mendoza@colegio.edu",
          password: hashedPassword,
          name: "Carlos Mendoza López",
          role: UserRole.STUDENT,
          code: "2024-4B-015",
          grade: "4°",
          section: "B",
        },
        {
          email: "ana.ramirez@colegio.edu",
          password: hashedPassword,
          name: "Ana Sofía Ramírez",
          role: UserRole.STUDENT,
          code: "2024-4B-003",
          grade: "4°",
          section: "B",
        },
        {
          email: "diego.fernandez@colegio.edu",
          password: hashedPassword,
          name: "Diego Fernández Castro",
          role: UserRole.STUDENT,
          code: "2024-4B-012",
          grade: "4°",
          section: "B",
        },
        // Profesores
        {
          email: "maria.lopez@colegio.edu",
          password: hashedPassword,
          name: "Prof. María López Hernández",
          role: UserRole.TEACHER,
          code: "PROF-2024-001",
          grade: null,
          section: null,
        },
        {
          email: "roberto.silva@colegio.edu",
          password: hashedPassword,
          name: "Prof. Roberto Silva Vargas",
          role: UserRole.TEACHER,
          code: "PROF-2024-002",
          grade: null,
          section: null,
        },
      ]

      for (const userData of users) {
        const user = this.userRepository.create(userData)
        await this.userRepository.save(user)
      }

      console.log("✅ Users seeded successfully!")
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password, role } = loginDto;
  
    const baseUrl = 'http://localhost:3002/students';
    const endpoint =
      role === 'teacher' ? `${baseUrl}/teachers/validate-login` : `${baseUrl}/validate-login`;
  
    try {
      const response = await axios.post(endpoint, {
        email,
        password,
      });
  
      const user = response.data.data;
  
      const payload: any = {
        sub: user.id,
        email: user.email,
        role: user.role,
        name: `${user.firstName} ${user.lastName}`,
        code: user.code ?? null,
        grade: user.grade ?? null,
        section: user.section ?? null,
      };
  
      const token = await this.jwtService.signAsync(payload);
  
      return {
        token,
        user: payload,
      };
    } catch (error) {
      console.error("❌ Error al autenticar:", error.response?.data || error.message);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
  
  
  

  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token)
      const user = await this.userRepository.findOne({
        where: { id: payload.sub, isActive: true },
      })

      if (!user) {
        throw new UnauthorizedException("User not found")
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        code: user.code,
        grade: user.grade,
        section: user.section,
      }
    } catch (error) {
      throw new UnauthorizedException("Invalid token")
    }
  }
}
