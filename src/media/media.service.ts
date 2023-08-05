import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InsertMediaDto, UpdateMediaDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../base/base.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class MediaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly baseService: BaseService,
    private readonly cloudinaryService: CloudinaryService,
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

  async uploadSingleFile(
    userId: string,
    file: Express.Multer.File,
    insertMediaDto: InsertMediaDto,
  ) {
    const cloudinaryResponse = await this.cloudinaryService.uploadFile(file);
    try {
      const media = await this.prismaService.media.create({
        data: {
          ...insertMediaDto,
          filename: `${cloudinaryResponse.public_id}.${cloudinaryResponse.format}`,
          public_id: cloudinaryResponse.public_id,
          resource_type: cloudinaryResponse.resource_type,
          format: cloudinaryResponse.format,
          size: cloudinaryResponse.bytes,
          url: cloudinaryResponse.url,
          width: cloudinaryResponse.width,
          height: cloudinaryResponse.height,
          status: insertMediaDto.status || 'publish',
          user_created_id: userId,
          user_updated_id: userId,
        },
      });

      return this.baseService.generateSuccessResponse(
        HttpStatus.OK,
        'Media created successfully',
        { media },
      );
    } catch (error) {
      console.error(error);
      throw new ForbiddenException(error);
    }
  }

  async uploadMultipleFile(
    userId: string,
    files: Express.Multer.File[],
    insertMediaDto: InsertMediaDto,
  ) {
    const cloudinaryResponses = await this.cloudinaryService.uploadFiles(files);
    try {
      const media = await this.prismaService.$transaction(
        cloudinaryResponses.map((item) =>
          this.prismaService.media.create({
            data: {
              ...insertMediaDto,
              filename: `${item.public_id}.${item.format}`,
              public_id: item.public_id,
              resource_type: item.resource_type,
              format: item.format,
              size: item.bytes,
              url: item.url,
              width: item.width,
              height: item.height,
              status: insertMediaDto.status || 'publish',
              user_created_id: userId,
              user_updated_id: userId,
            },
          }),
        ),
      );

      return this.baseService.generateSuccessResponse(
        HttpStatus.OK,
        'Media created successfully',
        { media },
      );
    } catch (error) {
      console.error(error);
      throw new ForbiddenException(error);
    }
  }

  async updateMedia(
    userId: string,
    mediaId: number,
    updateMediaDto: UpdateMediaDto,
  ) {
    try {
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
    } catch (error) {
      console.error(error);
      throw new ForbiddenException(error);
    }
  }

  async deleteMedia(userId: string, mediaId: number) {
    await this.checkMediaExist(mediaId);

    try {
      const result = await this.prismaService.media.delete({
        where: {
          id: mediaId,
        },
      });

      await this.cloudinaryService.deleteFile(result.public_id);

      return this.baseService.generateSuccessResponse(
        HttpStatus.OK,
        'Media deleted successfully',
        { result },
      );
    } catch (error) {
      console.error(error);
      throw new ForbiddenException(error);
    }
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
