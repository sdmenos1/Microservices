import { AuthService } from "./auth.service";
import type { LoginDto } from "./dto/login.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getRoot(): string;
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        data: {
            token: string;
            user: any;
        };
        message: string;
    }>;
    validateToken(body: {
        token: string;
    }): Promise<{
        success: boolean;
        data: {
            id: number;
            email: string;
            name: string;
            role: import("./entities/user.entity").UserRole;
            code: string;
            grade: string;
            section: string;
        };
        message: string;
    }>;
}
