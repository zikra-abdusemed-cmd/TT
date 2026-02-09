// src/category/category.controller.ts
import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entity/category.entity';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    // Retrieve all categories
    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }
}