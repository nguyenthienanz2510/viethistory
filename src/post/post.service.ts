import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InsertPostDto, UpdatePostDto } from './dto';
import { BaseService } from '../base/base.service';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly baseService: BaseService,
  ) {}

  async getPosts() {
    const posts = await this.prismaService.post.findMany({
      include: {
        user_created: true,
        user_updated: true,
        translations: true,
      },
    });

    const formattedPosts = posts.map((post) => {
      const translations = {};
      post.translations.forEach((translation) => {
        delete post.translations

        translations[translation.language_code] = {
          ...post,
          ...translation,
        };
      });

      return {
        ...post,
        translations,
      };
    });

    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Posts fetched successfully',
      { posts: formattedPosts },
    );
  }

  async getPostById(postId: number) {
    await this.checkPostExist(postId);

    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      include: {
        user_created: true,
        user_updated: true,
        translations: true,
      },
    });

    const translations = {};
    post.translations.forEach((translation) => {
      delete post.translations

      translations[translation.language_code] = {
        ...post,
        ...translation,
      };
    });

    const formattedPost = {
      ...post,
      translations,
    };

    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Post fetched successfully',
      { post: formattedPost },
    );
  }

  async createPost(userId: string, insertPostDto: InsertPostDto) {
    const slug = await this.baseService.generateUniqueSlug(
      insertPostDto.title,
      'post',
    );

    const categories = insertPostDto.categories.length
      ? insertPostDto.categories.map((categoryId) => ({
          category: {
            connect: {
              id: categoryId,
            },
          },
        }))
      : [];

    delete insertPostDto.categories;

    const post = await this.prismaService.post.create({
      data: {
        ...insertPostDto,
        user_created_id: userId,
        user_updated_id: userId,
        slug,
        status: insertPostDto.status || 'publish',

        categories: {
          create: categories,
        },

        translations: {
          create: insertPostDto.translations,
        },
      },
      include: {
        translations: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return this.baseService.generateSuccessResponse(
      HttpStatus.CREATED,
      'Post created successfully',
      { post },
    );
  }

  async updatePost(
    userId: string,
    postId: number,
    updatePostDto: UpdatePostDto,
  ) {
    const post = await this.checkPostExist(postId);

    const translationCreates = [];
    const translationUpdates = [];

    for (const translationDto of updatePostDto.translations) {
      const existingTranslation = post.translations.find(
        (t) => t.language_code === translationDto.language_code,
      );

      if (existingTranslation) {
        translationUpdates.push({
          where: {
            id: existingTranslation.id,
          },
          data: {
            title: translationDto.title,
            description: translationDto.description,
            content: translationDto.content,
            meta_title: translationDto.meta_title,
            meta_description: translationDto.meta_description,
          },
        });
      } else {
        translationCreates.push({
          post_id: postId,
          language_code: translationDto.language_code,
          title: translationDto.title,
          description: translationDto.description,
          content: translationDto.content,
          meta_title: translationDto.meta_title,
          meta_description: translationDto.meta_description,
        });
      }
    }

    await this.prismaService.postTranslations.createMany({
      data: translationCreates,
    });

    const categoryCreates = [];
    const categoryDeletes = [];

    if (updatePostDto.categories && updatePostDto.categories.length > 0) {
      for (const categoryId of updatePostDto.categories) {
        const existingCategory = post.categories.find(
          (category) => category.category_id === categoryId,
        );

        if (!existingCategory) {
          categoryCreates.push({
            category: {
              connect: {
                id: categoryId,
              },
            },
          });
        }
      }

      for (const category of post.categories) {
        if (!updatePostDto.categories.includes(category.category_id)) {
          categoryDeletes.push({
            post_id_category_id: {
              post_id: post.id,
              category_id: category.category_id,
            },
          });
        }
      }
    }

    delete updatePostDto.categories;

    const updatedPost = await this.prismaService.post.update({
      where: { id: postId },
      data: {
        ...updatePostDto,
        user_updated_id: userId,

        categories: {
          delete: categoryDeletes,
          create: categoryCreates,
        },

        translations: {
          updateMany: translationUpdates,
        },
      },
      include: {
        user_created: true,
        user_updated: true,
        translations: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Post updated successfully',
      { post: updatedPost },
    );
  }

  async deletePost(userId: string, postId: number) {
    await this.checkPostExist(postId);
    const post = await this.prismaService.post.delete({
      where: { id: postId },
      include: {
        translations: true,
      },
    });
    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Post deleted successfully',
      { post },
    );
  }

  private async checkPostExist(postId: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      include: {
        translations: true,
        categories: true,
      },
    });
    if (!post) {
      throw new ForbiddenException('Post not found');
    }
    return post;
  }
}
