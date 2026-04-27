import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;

    // ⚠️ AQUÍ debes traer usuario de la DB
    const user = {
      id: 1,
      email: email,
      password: '$2b$10$testhash' // ejemplo
    };

    const validatedUser = await this.authService.validateUser(
      email,
      password,
      user,
    );

    return this.authService.login(validatedUser);
  }
}