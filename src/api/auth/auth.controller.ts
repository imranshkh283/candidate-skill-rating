import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { signInDTO, signUpDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signUp')
  async signup(@Body() data: signUpDTO) {
    return this.authService.signup(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async login(@Body() data: signInDTO) {
    return this.authService.login(data);
  }
}
