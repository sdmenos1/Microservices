import { type OnModuleInit } from "@nestjs/common";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { User } from "./entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import { HttpService } from '@nestjs/axios';
import { UserRole } from "./entities/user.entity";
export declare class AuthService implements OnModuleInit {
    private readonly userRepository;
    private readonly jwtService;
    private readonly httpService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, httpService: HttpService);
    onModuleInit(): Promise<void>;
    private seedUsers;
    login(loginDto: LoginDto): Promise<{
        token: string;
        user: any;
    }>;
    validateToken(token: string): Promise<{
        id: number;
        email: string;
        name: string;
        role: UserRole;
        code: string;
        grade: string;
        section: string;
    }>;
}
