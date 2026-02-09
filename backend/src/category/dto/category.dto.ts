import { IsString } from 'class-validator';

export class CategoryDto {
    @IsString()
    id: string; // Category ID

    @IsString()
    name: string; // Category name
}