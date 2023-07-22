import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() userDto: AuthDto) {
    console.log(userDto);
    return this.authService.register(userDto);
  }

  @Post('login')
  login(@Body() userDto: AuthDto) {
    return this.authService.login(userDto);
  }
}
