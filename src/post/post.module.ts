import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';

@Module({
  imports: [PrismaModule, BaseModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
