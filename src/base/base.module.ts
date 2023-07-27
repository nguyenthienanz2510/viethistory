import { Module } from '@nestjs/common';
import { BaseService } from './base.service';

@Module({
  exports: [BaseService],
  providers: [BaseService],
})
export class BaseModule {}
