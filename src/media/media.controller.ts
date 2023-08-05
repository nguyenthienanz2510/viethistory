import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AccessJwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { InsertMediaDto, UpdateMediaDto } from './dto';
import { MediaService } from './media.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(AccessJwtGuard)
  @Get()
  getMedia() {
    return this.mediaService.getMedia();
  }

  @UseGuards(AccessJwtGuard)
  @Get(':id')
  getMediaById(@Param('id', ParseIntPipe) mediaId: number) {
    return this.mediaService.getMediaById(mediaId);
  }

  @UseGuards(AccessJwtGuard)
  @Post('upload/single')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({ description: 'Upload image', type: String })
  public async uploadSingleFile(
    @GetUser('id') userId: string,
    @UploadedFile()
    file: Express.Multer.File,
    @Body() insertMediaDto: InsertMediaDto,
  ) {
    return await this.mediaService.uploadSingleFile(
      userId,
      file,
      insertMediaDto,
    );
  }

  @UseGuards(AccessJwtGuard)
  @Post('upload/multiple')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiOkResponse({ description: 'Upload image', type: String })
  public async uploadMultipleFile(
    @GetUser('id') userId: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() insertMediaDto: InsertMediaDto,
  ) {
    return await this.mediaService.uploadMultipleFile(
      userId,
      files,
      insertMediaDto,
    );
  }

  @UseGuards(AccessJwtGuard)
  @Patch(':id')
  updateMedia(
    @GetUser('id') userId: string,
    @Param('id', ParseIntPipe) mediaId: number,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    return this.mediaService.updateMedia(userId, mediaId, updateMediaDto);
  }

  @UseGuards(AccessJwtGuard)
  @Delete(':id')
  deleteMedia(
    @GetUser('id') userId: string,
    @Param('id', ParseIntPipe) mediaId: number,
  ) {
    return this.mediaService.deleteMedia(userId, mediaId);
  }
}
