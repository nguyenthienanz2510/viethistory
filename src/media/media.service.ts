import { Injectable } from '@nestjs/common';
import { InsertMediaDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(private readonly prismaService: PrismaService) {}

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

  private removePublicPrefix(filePath: string): string {
    const publicPrefix = 'public/';
    if (filePath.startsWith(publicPrefix)) {
      return filePath.substring(publicPrefix.length);
    }
    return filePath;
  }
}
