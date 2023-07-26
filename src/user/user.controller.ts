import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { AccessJwtGuard } from '../auth/guard';
import { AuthDto } from '../auth/dto';

@Controller('users')
export class UserController {
  @UseGuards(AccessJwtGuard)
  @Get('me')
  me(@GetUser() user: AuthDto) {
    return user;
  }
}
