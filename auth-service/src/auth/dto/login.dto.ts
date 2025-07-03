import { IsEmail, IsIn, IsNotEmpty, MinLength } from "class-validator"

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @MinLength(6)
  password: string

  @IsIn(['student', 'teacher']) // 👈 valida que sea uno de los dos
  role: string;
}
