import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { accessJwtStrategy, refreshJwtStrategy } from './strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ConfigModule, JwtModule.register({}), PrismaModule, UserModule],
  controllers: [AuthController],
  providers: [accessJwtStrategy, refreshJwtStrategy, AuthService],
})
export class AuthModule {}
