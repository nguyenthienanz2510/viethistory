import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { AccessJwtGuard } from '../auth/guard';
import { AuthDto } from '../auth/dto';
import { BaseService } from '../base/base.service';

@Controller('users')
export class UserController {
  constructor(private readonly baseService: BaseService) {}
  @UseGuards(AccessJwtGuard)
  @Get('me')
  me(@GetUser() user: AuthDto) {
    return this.baseService.generateSuccessResponse(
      200,
      'User fetched successfully',
      { user },
    );
  }
}
