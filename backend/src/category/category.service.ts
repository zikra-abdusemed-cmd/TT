import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    // Retrieve all categories
    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    // Find an existing category by name, or create it if it does not exist.
    async findOrCreateByName(name: string): Promise<Category> {
        const trimmed = name.trim();
        if (!trimmed) {
            throw new Error('Category name cannot be empty');
        }

        let category = await this.categoryRepository.findOne({
            where: { name: trimmed },
        });

        if (!category) {
            category = this.categoryRepository.create({ name: trimmed });
            category = await this.categoryRepository.save(category);
        }

        return category;
    }
}