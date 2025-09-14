import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsString, MinLength } from 'class-validator';

class RegisterDto {
  @IsEmail() email!: string;
  @IsString() @MinLength(2) name!: string;
  @IsString() @MinLength(6) password!: string;
}

class LoginDto {
  @IsEmail() email!: string;
  @IsString() @MinLength(6) password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }
}
