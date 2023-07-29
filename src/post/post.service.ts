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
      },
    });
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
        user_created: true,
        user_updated: true,
      },
    });
    return this.baseService.generateSuccessResponse(
      HttpStatus.OK,
      'Post fetched successfully',
      { post },
    );
  }

  async createPost(userId: string, insertPostDto: InsertPostDto) {
    const slug = await this.baseService.generateUniqueSlug(
      insertPostDto.title,
      'post',
    );
    const post = await this.prismaService.post.create({
      data: {
        ...insertPostDto,
        user_created_id: userId,
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

  private async checkPostExist(postId: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      throw new ForbiddenException('Post not found');
    }
  }
}
