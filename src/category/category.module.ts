import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';

@Module({
  imports: [PrismaModule, BaseModule],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
