import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { User } from "./entities/user.entity"
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule, // ⬅️ Importante para hacer peticiones HTTP
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
