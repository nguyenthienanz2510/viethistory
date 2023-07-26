import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto, LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async register(userDto: AuthDto) {
    const hashedPassword = await argon.hash(userDto.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: userDto.email,
          username: userDto.username || userDto.email,
          password: hashedPassword,
          phone_number: userDto.phone_number,
          status: userDto.status,
          role: userDto.role,
          first_name: userDto.first_name,
          last_name: userDto.last_name,
          avatar: userDto.avatar,
        },
        select: {
          id: true,
          email: true,
          phone_number: true,
          status: true,
          role: true,
          first_name: true,
          last_name: true,
        },
      });
      return await this.convertObjectToJwtString(user.id, user.email);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException(
          `Unique constraint failed on the ${error.meta.target}`,
        );
      }
      return {
        error: error,
      };
    }
  }

  async login(userDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: userDto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const passwordMatched = await argon.verify(user.password, userDto.password);

    if (!passwordMatched) {
      throw new ForbiddenException('Incorrect password');
    }
    delete user.password;
    return await this.convertObjectToJwtString(user.id, user.email);
  }

  async convertObjectToJwtString(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email: email,
    };

    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });

    return {
      accessToken: jwtString,
    };
  }
}
