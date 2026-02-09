// src/category/category.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service'; // Correct import for CategoryService
import { CategoryController } from './category.controller';
import { Category } from './entity/category.entity';// Import the Category entity

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // Register the Category entity for use with TypeORM
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}