import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { accessJwtStrategy } from '../auth/strategy';
import { ConfigModule } from '@nestjs/config';
import { BaseModule } from '../base/base.module';

@Module({
  imports: [ConfigModule, PrismaModule, BaseModule],
  controllers: [UserController],
  providers: [accessJwtStrategy],
})
export class UserModule {}
