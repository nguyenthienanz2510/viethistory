import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { basename, extname } from 'path';
import { AccessJwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { InsertMediaDto } from './dto';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(AccessJwtGuard)
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, callback) => {
          const fileExtName = extname(file.originalname);
          const fileBaseName = basename(file.originalname, fileExtName);
          const timeStamp = Math.floor(Date.now() / 1000).toString();
          const fileName = `${fileBaseName}-${timeStamp}${fileExtName}`;
          callback(null, fileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          'image/jpg',
          'image/jpeg',
          'image/png',
          'image/gif',
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('Invalid file type'), false);
        }
      },
      limits: {
        fileSize: 2000000,
      },
    }),
  )
  uploadFiles(
    @GetUser('id') userId: string,
    @UploadedFiles()
    files: Express.Multer.File[],
    @Body() insertMediaDto: InsertMediaDto,
  ) {
    return this.mediaService.uploadFiles(userId, files, insertMediaDto);
  }
}
