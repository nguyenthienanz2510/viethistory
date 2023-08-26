import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InsertUserDto, AuthDto } from './dto';
import { GetUser } from './decorator';
import { AccessJwtGuard, RefreshJwtGuard } from './guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() userDto: InsertUserDto) {
    return this.authService.register(userDto);
  }

  @Post('login')
  login(@Body() userDto: AuthDto) {
    return this.authService.login(userDto);
  }

  @UseGuards(AccessJwtGuard)
  @Get('logout')
  logout(@GetUser('id') userId: string) {
    return this.authService.logout(userId);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
