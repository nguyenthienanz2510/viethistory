import { Status } from '@prisma/client';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  slug?: string;

  @IsOptional()
  @IsNumber()
  parent_id?;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsString()
  status?: Status;

  @IsOptional()
  @IsString()
  thumb?: number;

  @IsOptional()
  @IsArray()
  images?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  meta_title?;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  meta_description?;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  meta_keywords?;

  @IsOptional()
  @IsNumber()
  user_id?: number;

  updated_by: number;
}
