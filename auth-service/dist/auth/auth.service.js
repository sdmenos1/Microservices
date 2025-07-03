"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const axios_1 = require("@nestjs/axios");
const user_entity_2 = require("./entities/user.entity");
const axios_2 = require("axios");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, httpService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.httpService = httpService;
    }
    async onModuleInit() {
        await this.seedUsers();
    }
    async seedUsers() {
        const userCount = await this.userRepository.count();
        if (userCount === 0) {
            console.log("🌱 Seeding users...");
            const hashedPassword = await bcrypt.hash("123456", 10);
            const users = [
                {
                    email: "carlos.mendoza@colegio.edu",
                    password: hashedPassword,
                    name: "Carlos Mendoza López",
                    role: user_entity_2.UserRole.STUDENT,
                    code: "2024-4B-015",
                    grade: "4°",
                    section: "B",
                },
                {
                    email: "ana.ramirez@colegio.edu",
                    password: hashedPassword,
                    name: "Ana Sofía Ramírez",
                    role: user_entity_2.UserRole.STUDENT,
                    code: "2024-4B-003",
                    grade: "4°",
                    section: "B",
                },
                {
                    email: "diego.fernandez@colegio.edu",
                    password: hashedPassword,
                    name: "Diego Fernández Castro",
                    role: user_entity_2.UserRole.STUDENT,
                    code: "2024-4B-012",
                    grade: "4°",
                    section: "B",
                },
                {
                    email: "maria.lopez@colegio.edu",
                    password: hashedPassword,
                    name: "Prof. María López Hernández",
                    role: user_entity_2.UserRole.TEACHER,
                    code: "PROF-2024-001",
                    grade: null,
                    section: null,
                },
                {
                    email: "roberto.silva@colegio.edu",
                    password: hashedPassword,
                    name: "Prof. Roberto Silva Vargas",
                    role: user_entity_2.UserRole.TEACHER,
                    code: "PROF-2024-002",
                    grade: null,
                    section: null,
                },
            ];
            for (const userData of users) {
                const user = this.userRepository.create(userData);
                await this.userRepository.save(user);
            }
            console.log("✅ Users seeded successfully!");
        }
    }
    async login(loginDto) {
        const { email, password, role } = loginDto;
        const baseUrl = 'http://localhost:3002/students';
        const endpoint = role === 'teacher' ? `${baseUrl}/teachers/validate-login` : `${baseUrl}/validate-login`;
        try {
            const response = await axios_2.default.post(endpoint, {
                email,
                password,
            });
            const user = response.data.data;
            const payload = {
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
        }
        catch (error) {
            console.error("❌ Error al autenticar:", error.response?.data || error.message);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
    }
    async validateToken(token) {
        try {
            const payload = await this.jwtService.verifyAsync(token);
            const user = await this.userRepository.findOne({
                where: { id: payload.sub, isActive: true },
            });
            if (!user) {
                throw new common_1.UnauthorizedException("User not found");
            }
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                code: user.code,
                grade: user.grade,
                section: user.section,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Invalid token");
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        axios_1.HttpService])
], AuthService);
//# sourceMappingURL=auth.service.js.map