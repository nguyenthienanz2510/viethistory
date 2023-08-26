import { Status } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMediaDto {
  @IsOptional()
  status?: Status;

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

  user_updated_id: string;
}
