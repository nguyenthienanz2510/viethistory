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

  private selectReturnField = {
    id: true,
    parent_id: true,
    name: true,
    slug: true,
    description: true,
    status: true,
    thumb: true,
    images: true,
    is_featured: true,
    order: true,
    meta_title: true,
    meta_description: true,
    created_at: true,
    updated_at: true,
    user_created: {
      select: {
        id: true,
        email: true,
        username: true,
        phone_number: true,
        role: true,
        status: true,
        first_name: true,
        last_name: true,
        avatar_id: true,
      },
    },
    user_updated: {
      select: {
        id: true,
        email: true,
        username: true,
        phone_number: true,
        role: true,
        status: true,
        first_name: true,
        last_name: true,
        avatar_id: true,
      },
    },
    translations: true,
  };

  async getCategories() {
    const categories = await this.prismaService.category.findMany({
      select: this.selectReturnField,
    });

    const formattedCategories = categories.map((category) => {
      const translations = {};
      category.translations.forEach((translation) => {
        delete category.translations;

        translations[translation.language_code] = {
          ...category,
          ...translation,
        };
      });

      return {
        ...category,
        translations,
      };
    });

    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Categories fetched successfully',
      { categories: formattedCategories },
    );
  }

  async getCategoryBySlug({ slug }: { slug: string }) {
    if (slug) {
      const category = await this.prismaService.category.findUnique({
        where: {
          slug: slug,
        },
        include: {
          user_created: true,
          user_updated: true,
          translations: true,
          thumb: true,
        },
      });

      const translations = {};
      category.translations.forEach((translation) => {
        delete category.translations;

        translations[translation.language_code] = {
          ...category,
          ...translation,
        };
      });

      const formattedCategory = {
        ...category,
        translations,
      };

      return this.baseService.generateSuccessResponse(
        HttpStatus.OK,
        'Category fetched successfully',
        { category: formattedCategory },
      );
    }
  }

  async getCategoryById(categoryId: number) {
    await this.checkCategoryExist(categoryId);

    const category = await this.prismaService.category.findUnique({
      where: { id: categoryId },
      select: this.selectReturnField,
    });

    const translations = {};
    category.translations.forEach((translation) => {
      delete category.translations;

      translations[translation.language_code] = {
        ...category,
        ...translation,
      };
    });

    const formattedCategory = {
      ...category,
      translations,
    };
    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Category fetched successfully',
      { category: formattedCategory },
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
        status: insertCategoryDto.status,

        translations: {
          create: insertCategoryDto.translations,
        },
      },
      select: this.selectReturnField,
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
    const currentCategory = await this.checkCategoryExist(categoryId);

    const translationCreates = [];
    const translationUpdates = [];

    for (const translationDto of currentCategory.translations) {
      const existingTranslation = currentCategory.translations.find(
        (t) => t.language_code === translationDto.language_code,
      );

      if (existingTranslation) {
        translationUpdates.push({
          where: {
            id: existingTranslation.id,
          },
          data: {
            name: translationDto.name,
            description: translationDto.description,
            meta_title: translationDto.meta_title,
            meta_description: translationDto.meta_description,
          },
        });
      } else {
        translationCreates.push({
          category_id: categoryId,
          language_code: translationDto.language_code,
          name: translationDto.name,
          description: translationDto.description,
          meta_title: translationDto.meta_title,
          meta_description: translationDto.meta_description,
        });
      }
    }

    await this.prismaService.categoryTranslations.createMany({
      data: translationCreates,
    });

    const category = await this.prismaService.category.update({
      where: { id: categoryId },
      data: {
        ...updateCategoryDto,
        user_updated_id: userId,

        translations: {
          updateMany: translationUpdates,
        },
      },
      select: this.selectReturnField,
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
      include: {
        translations: true,
      },
    });
    if (!category) {
      throw new ForbiddenException('Category not found');
    }

    return category;
  }
}
