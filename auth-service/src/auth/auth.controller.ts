import { AuthService } from "./auth.service"
import type { LoginDto } from "./dto/login.dto"
import { Controller, Post, HttpException, HttpStatus, Body, Get } from "@nestjs/common"


@Controller("auth") //localhost:3001/auth/()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getRoot() {
    return "Auth Service is running!";
  }

  @Post("login") //localhost:3001/auth/login
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto)
      return {
        success: true,
        data: result,
        message: "Login successful",
      }
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || "Login failed",
        },
        HttpStatus.UNAUTHORIZED,
      )
    }
  }
  //JWT (JSON WEB TOKKEN)
  @Post("validate")
  async validateToken(@Body() body: { token: string }) {
    try {
      const user = await this.authService.validateToken(body.token)
      return {
        success: true,
        data: user,
        message: "Token valid",
      }
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Invalid token",
        },
        HttpStatus.UNAUTHORIZED,
      )
    }
  }
}
