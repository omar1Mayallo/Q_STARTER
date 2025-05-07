import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @DESC: User Register
  // @url: POST => "auth/register"
  @Post('register')
  async register(@Body() body: CreateUserDTO) {
    console.log('register', body);
    // return await this.authService.register(body);
  }

  // @DESC: User Login
  // @url: POST => "auth/login"
  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginUserDTO) {
    return await this.authService.login(body);
  }

  // @DESC: User Forget Password
  // @url: POST => "auth/forget-password"
  @Post('forget-password')
  async forgetPassword(_: any) {
    console.log('forgetPassword');
  }

  // @DESC: User Login With OTP
  // @url: POST => "auth/otp-login"
  @Post('otp-login')
  async loginWithOtp(_: any) {
    console.log('loginWithOtp');
  }
}
