import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InsertMediaDto, UpdateMediaDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as path from 'path';
import * as fs from 'fs';
import { BaseService } from '../base/base.service';

@Injectable()
export class MediaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly baseService: BaseService,
  ) {}

  async getMedia() {
    const media = await this.prismaService.media.findMany({
      include: {
        user_created: true,
        user_updated: true,
      },
    });
    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Media fetched successfully',
      { media },
    );
  }

  async getMediaById(mediaId: number) {
    await this.checkMediaExist(mediaId);
    const media = await this.prismaService.media.findUnique({
      where: { id: mediaId },
      include: {
        user_created: true,
        user_updated: true,
      },
    });
    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Media fetched successfully',
      { media },
    );
  }

  async uploadFiles(
    userId: string,
    files: Express.Multer.File[],
    insertMediaDto: InsertMediaDto,
  ) {
    const mediaInsert = this.prismaService.$transaction(
      files.map((file) =>
        this.prismaService.media.create({
          data: {
            ...insertMediaDto,
            mimetype: file.mimetype,
            destination: file.destination,
            filename: file.filename,
            path: this.removePublicPrefix(file.path),
            size: file.size,
            status: insertMediaDto.status || 'publish',
            user_created_id: userId,
            user_updated_id: userId,
          },
        }),
      ),
    );

    return mediaInsert;
  }

  async updateMedia(
    userId: string,
    mediaId: number,
    updateMediaDto: UpdateMediaDto,
  ) {
    await this.checkMediaExist(mediaId);
    const media = await this.prismaService.media.update({
      where: { id: mediaId },
      data: { ...updateMediaDto, user_updated_id: userId },
    });
    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Media updated successfully',
      { media },
    );
  }

  async deleteMedia(userId: string, mediaId: number) {
    await this.checkMediaExist(mediaId);

    const media = await this.prismaService.media.delete({
      where: {
        id: mediaId,
      },
    });
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'public',
      'uploads',
      media.filename,
    );
    fs.unlinkSync(filePath);
    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'File deleted successfully',
      { media },
    );
  }

  private removePublicPrefix(filePath: string): string {
    const publicPrefix = 'public/';
    if (filePath.startsWith(publicPrefix)) {
      return filePath.substring(publicPrefix.length);
    }
    return filePath;
  }

  private async checkMediaExist(mediaId: number) {
    const media = await this.prismaService.media.findUnique({
      where: { id: mediaId },
    });
    if (!media) {
      throw new ForbiddenException('File not found');
    }
  }
}
