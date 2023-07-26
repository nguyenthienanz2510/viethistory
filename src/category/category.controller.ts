import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { CategoryService } from './category.service';
import { InsertCategoryDto, UpdateCategoryDto } from './dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id', ParseIntPipe) categoryId: number) {
    return this.categoryService.getCategoryById(categoryId);
  }

  @UseGuards(MyJwtGuard)
  @Post()
  createCategory(
    @GetUser('id') userId: number,
    @Body() insertCategoryDto: InsertCategoryDto,
  ) {
    return this.categoryService.createCategory(userId, insertCategoryDto);
  }

  @UseGuards(MyJwtGuard)
  @Patch(':id')
  updateCategory(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) categoryId: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(
      userId,
      categoryId,
      updateCategoryDto,
    );
  }

  @UseGuards(MyJwtGuard)
  @Delete(':id')
  deleteCategory(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) categoryId: number,
  ) {
    return this.categoryService.deleteCategory(userId, categoryId);
  }
}
