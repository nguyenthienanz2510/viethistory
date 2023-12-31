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
import { GetUser } from '../auth/decorator';
import { CategoryService } from './category.service';
import { InsertCategoryDto, UpdateCategoryDto } from './dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  getCategories(@Query('slug') slug: string) {
    const query = {
      slug: slug,
    };
    if (query.slug) {
      return this.categoryService.getCategoryBySlug(query);
    }
    return this.categoryService.getCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id', ParseIntPipe) categoryId: number) {
    return this.categoryService.getCategoryById(categoryId);
  }

  @UseGuards(AccessJwtGuard)
  @Post()
  createCategory(
    @GetUser('id') userId: string,
    @Body() insertCategoryDto: InsertCategoryDto,
  ) {
    return this.categoryService.createCategory(userId, insertCategoryDto);
  }

  @UseGuards(AccessJwtGuard)
  @Patch(':id')
  updateCategory(
    @GetUser('id') userId: string,
    @Param('id', ParseIntPipe) categoryId: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(
      userId,
      categoryId,
      updateCategoryDto,
    );
  }

  @UseGuards(AccessJwtGuard)
  @Delete(':id')
  deleteCategory(
    @GetUser('id') userId: string,
    @Param('id', ParseIntPipe) categoryId: number,
  ) {
    return this.categoryService.deleteCategory(userId, categoryId);
  }
}
