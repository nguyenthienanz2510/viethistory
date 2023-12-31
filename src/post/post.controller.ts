import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AccessJwtGuard } from '../auth/guard';
import { PostService } from './post.service';
import { GetUser } from '../auth/decorator';
import { InsertPostDto, UpdatePostDto } from './dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  getPosts(@Query('slug') slug: string) {
    const query = {
      slug: slug,
    };
    if (query.slug) {
      return this.postService.getPostBySlug(query);
    }
    return this.postService.getPosts();
  }

  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) postId: number) {
    return this.postService.getPostById(postId);
  }

  @UseGuards(AccessJwtGuard)
  @Post()
  createPost(
    @GetUser('id') userId: string,
    @Body() insertPostDto: InsertPostDto,
  ) {
    return this.postService.createPost(userId, insertPostDto);
  }

  @UseGuards(AccessJwtGuard)
  @Patch(':id')
  updatePost(
    @GetUser('id') userId: string,
    @Param('id', ParseIntPipe) postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updatePost(userId, postId, updatePostDto);
  }

  @UseGuards(AccessJwtGuard)
  @Delete(':id')
  deletePost(
    @GetUser('id') userId: string,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    return this.postService.deletePost(userId, postId);
  }
}
