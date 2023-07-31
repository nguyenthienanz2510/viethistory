import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BaseModule } from '../base/base.module';

@Module({
  imports: [PrismaModule, BaseModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
