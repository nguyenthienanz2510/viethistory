import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertPostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPosts() {
    const posts = await this.prismaService.post.findMany();
    return posts;
  }

  async getPostById(postId: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
    });
    return post;
  }

  async createPost(userId: number, insertPostDto: InsertPostDto) {
    const post = await this.prismaService.post.create({
      data: {
        ...insertPostDto,
        user_id: userId,
      },
    });
    return post;
  }

  async updatePost(
    userId: number,
    postId: number,
    updatePostDto: UpdatePostDto,
  ) {
    const post = await this.prismaService.post.update({
      where: { id: postId },
      data: {
        ...updatePostDto,
      },
    });
    return post;
  }

  async deletePost(userId: number, postId: number) {
    const post = await this.prismaService.post.delete({
      where: { id: postId },
    });
    return post;
  }
}
