import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UserCreateDto {
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
  status: string;

  @IsOptional()
  @IsString()
  role: string;

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
