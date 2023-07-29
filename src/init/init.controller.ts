import { Controller, Post } from '@nestjs/common';
import { InitService } from './init.service';

@Controller('init')
export class InitController {
  constructor(private readonly initService: InitService) {}

  @Post('database')
  async initDatabase() {
    return await this.initService.initDatabase();
  }
}
