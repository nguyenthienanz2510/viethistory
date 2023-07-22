import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from '../auth/strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [UserController],
  providers: [JwtStrategy],
})
export class UserModule {}
