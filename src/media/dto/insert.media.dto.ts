import { Status } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class InsertMediaDto {
  filename: string;
  public_id: string;
  resource_type: string;
  format: string;
  destination?: string;
  size: number;
  width: number;
  height: number;
  url: string;

  @IsOptional()
  status: Status;

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
