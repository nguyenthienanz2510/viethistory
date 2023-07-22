import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { Role, Status } from '@prisma/client';

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
  phone_number: string;

  @IsOptional()
  @IsString()
  status: Status;

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
