import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class InsertPostDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  slug?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value || 'publish')
  status: string;

  @IsOptional()
  @IsString()
  thumb?: number;

  @IsOptional()
  @IsArray()
  images?: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsDateString()
  timestamp: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  meta_title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  meta_description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  meta_keywords?: string;

  user_created_id: string;

  user_updated_id: string;
}
