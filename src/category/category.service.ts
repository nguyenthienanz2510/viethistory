import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCategories() {
    const categories = await this.prismaService.category.findMany();
    return categories;
  }

  async getCategoryById(categoryId: number) {
    const category = await this.prismaService.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new ForbiddenException('Category not found');
    }
    return category;
  }

  async createCategory(userId: string, insertCategoryDto: InsertCategoryDto) {
    const category = await this.prismaService.category.create({
      data: {
        ...insertCategoryDto,
        user_id: userId,
        user_updated_id: userId,
      },
    });
    return category;
  }

  async updateCategory(
    userId: string,
    categoryId: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.prismaService.category.findFirst({
      where: { id: categoryId },
    });
    if (!category) {
      throw new ForbiddenException('Category not found');
    }
    return await this.prismaService.category.update({
      where: { id: categoryId },
      data: {
        ...updateCategoryDto,
        user_updated_id: userId,
      },
    });
  }

  async deleteCategory(userId: string, categoryId: number) {
    const category = await this.prismaService.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new ForbiddenException('Category not found');
    }
    return await this.prismaService.category.delete({
      where: { id: categoryId },
    });
  }
}
