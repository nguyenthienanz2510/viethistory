import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { InsertUserDto, AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { BaseService } from '../base/base.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly baseService: BaseService,
  ) {}
  async register(userDto: InsertUserDto) {
    const userExists = await this.prismaService.user.findUnique({
      where: { email: userDto.email },
    });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    try {
      const hashedPassword = await argon.hash(userDto.password);

      const user = await this.prismaService.user.create({
        data: {
          ...userDto,
          username: userDto.username || userDto.email,
          password: hashedPassword
        },
        include: {
          avatar: true
        }
      });

      delete user.password
      delete user.refresh_token

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refresh_token);

      return this.baseService.generateSuccessResponse(
        HttpStatus.CREATED,
        'Register successfully',
        { tokens, profile: user },
      );
    } catch (error) {
      console.error(error);
      if (error.code === 'P2002') {
        throw new ForbiddenException(
          `Unique constraint failed on the ${error.meta.target}`,
        );
      }
      return this.baseService.generateErrorResponse(
        HttpStatus.BAD_REQUEST,
        'Register failed',
      );
    }
  }

  async login(userDto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: userDto.email,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const passwordMatched = await argon.verify(user.password, userDto.password);

    if (!passwordMatched) {
      throw new BadRequestException('Incorrect password');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    delete user.password;
    delete user.refresh_token;
  
    return this.baseService.generateSuccessResponse(
      HttpStatus.CREATED,
      'Login successfully',
      { tokens, profile: user },
    );
  }

  async logout(userId: string) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { refresh_token: null },
    });

    delete user.password;
    delete user.refresh_token;

    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Logout successfully',
      {
        profile: user,
      },
    );
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await argon.verify(
      user.refresh_token,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    delete user.password;
    delete user.refresh_token;

    return this.baseService.generateSuccessResponse(
      HttpStatus.CREATED,
      'Refresh Tokens successfully',
      { tokens, profile: user },
    );
  }

  hashData(data: string) {
    return argon.hash(data);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token: hashedRefreshToken,
      },
    });
  }

  async getTokens(userId: string, email: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '5m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '30d',
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
