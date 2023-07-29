import {
  IsArray,
  IsDateString,
  IsOptional,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  slug?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  thumb?: number;

  @IsOptional()
  @IsArray()
  images?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsDateString()
  timestamp?: string;

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

  user_created_id?: string;

  user_updated_id: string;
}
