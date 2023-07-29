import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BaseService {
  constructor(private readonly prismaService: PrismaService) {}

  generateSuccessResponse(statusCode: number, message: string, data: object) {
    return {
      statusCode,
      message,
      data,
    };
  }

  generateErrorResponse(statusCode: number, message: string, data?: object) {
    return {
      statusCode,
      message,
      data,
    };
  }

  async generateUniqueSlug(string: string, entity: string): Promise<string> {
    let counter = 1;

    const generateSlug = (string: string): string => {
      let slug: string;

      slug = string.toLowerCase();
      slug = slug.replace(/\s+/g, '-');
      slug = slug.replace(/[^\w-]/g, '');

      return slug;
    };

    let slug = generateSlug(string);

    while (true) {
      const existingEntity = await this.prismaService[entity].findFirst({
        where: {
          slug,
        },
      });

      if (!existingEntity) {
        return slug;
      }

      slug = generateSlug(`${string} ${counter}`);
      counter++;
    }
  }
}
