// src/category/category.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entity/category.entity';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    // Retrieve all categories
    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    // Create a new category (or return existing one with the same name)
    @Post()
    async create(@Body() categoryDto: CategoryDto): Promise<Category> {
        return this.categoryService.findOrCreateByName(categoryDto.name);
    }
}