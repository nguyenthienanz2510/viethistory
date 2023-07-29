import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InsertCategoryDto, UpdateCategoryDto } from './dto';
import { BaseService } from '../base/base.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly baseService: BaseService,
  ) {}

  async getCategories() {
    const categories = await this.prismaService.category.findMany({
      include: {
        user_created: true,
        user_updated: true,
      },
    });
    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Categories fetched successfully',
      { categories },
    );
  }

  async getCategoryById(categoryId: number) {
    await this.checkCategoryExist(categoryId);
    const category = await this.prismaService.category.findUnique({
      where: { id: categoryId },
      include: {
        user_created: true,
        user_updated: true,
      },
    });
    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Category fetched successfully',
      { category },
    );
  }

  async createCategory(userId: string, insertCategoryDto: InsertCategoryDto) {
    const slug = await this.baseService.generateUniqueSlug(
      insertCategoryDto.name,
      'category',
    );
    const category = await this.prismaService.category.create({
      data: {
        ...insertCategoryDto,
        user_created_id: userId,
        user_updated_id: userId,
        slug,
      },
    });
    return this.baseService.generateSuccessResponse(
      HttpStatus.CREATED,
      'Category created successfully',
      { category },
    );
  }

  async updateCategory(
    userId: string,
    categoryId: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.checkCategoryExist(categoryId);
    const category = await this.prismaService.category.update({
      where: { id: categoryId },
      data: { ...updateCategoryDto, user_updated_id: userId },
    });
    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Category updated successfully',
      { category },
    );
  }

  async deleteCategory(userId: string, categoryId: number) {
    await this.checkCategoryExist(categoryId);
    const category = await this.prismaService.category.delete({
      where: { id: categoryId },
    });
    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Category deleted successfully',
      { category },
    );
  }

  private async checkCategoryExist(categoryId: number) {
    const category = await this.prismaService.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new ForbiddenException('Category not found');
    }
  }
}
