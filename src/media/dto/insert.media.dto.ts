import { IsOptional, IsString } from 'class-validator';

export class InsertMediaDto {
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  url_cdn?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  alt?: string;

  @IsOptional()
  @IsString()
  description?: string;

  user_created_id: string;
  user_updated_id: string;
}
