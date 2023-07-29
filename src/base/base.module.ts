import { Module } from '@nestjs/common';
import { BaseService } from './base.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  exports: [BaseService],
  providers: [BaseService],
  imports: [PrismaModule],
})
export class BaseModule {}
