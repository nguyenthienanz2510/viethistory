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
    const posts = await this.prismaService.post.findMany();
    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Posts fetched successfully',
      { posts },
    );
  }

  async getPostById(postId: number) {
    await this.checkPostExist(postId);
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
        user_update: true,
      },
    });
    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Post fetched successfully',
      { post },
    );
  }

  async createPost(userId: string, insertPostDto: InsertPostDto) {
    const slug = await this.getUniqueSlug(insertPostDto.title);
    const post = await this.prismaService.post.create({
      data: {
        ...insertPostDto,
        user_id: userId,
        user_updated_id: userId,
        slug,
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
    await this.checkPostExist(postId);
    const post = await this.prismaService.post.update({
      where: { id: postId },
      data: { ...updatePostDto, user_updated_id: userId },
    });
    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Post updated successfully',
      { post },
    );
  }

  async deletePost(userId: string, postId: number) {
    await this.checkPostExist(postId);
    const post = await this.prismaService.post.delete({
      where: { id: postId },
    });
    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Post deleted successfully',
      { post },
    );
  }

  private async getUniqueSlug(title: string): Promise<string> {
    let counter = 1;
    let slug = this.generateSlug(title);

    while (true) {
      const existingPost = await this.prismaService.post.findFirst({
        where: {
          slug,
        },
      });

      if (!existingPost) {
        return slug;
      }

      slug = this.generateSlug(`${title} ${counter}`);
      counter++;
    }
  }

  private generateSlug(title: string): string {
    let slug: string;

    slug = title.toLowerCase();
    slug = slug.replace(/\s+/g, '-');
    slug = slug.replace(/[^\w-]/g, '');

    return slug;
  }

  private async checkPostExist(postId: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      throw new ForbiddenException('Post not found');
    }
  }
}
