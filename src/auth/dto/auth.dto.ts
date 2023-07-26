import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { Role, UserStatus } from '@prisma/client';
import { Transform } from 'class-transformer';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 16)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  @Transform(({ value }) => value || 'yourusername')
  username?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone_number: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || 'active')
  status: UserStatus;

  @IsOptional()
  @IsString()
  role: Role;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  first_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  last_name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  avatar: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
