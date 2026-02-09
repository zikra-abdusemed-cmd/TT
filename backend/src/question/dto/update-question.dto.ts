// src/question/dto/update-question.dto.ts
import { IsString, IsOptional, IsArray } from 'class-validator';
import { IsOption } from '../validators/is-option.validator'; // Adjust the path as necessary

export class UpdateQuestionDto {
    @IsString()
    @IsOptional() // Making this optional
    content?: string; // Optional main content of the question

    @IsArray()
    @IsString({ each: true })
    @IsOptional() // Making this optional
    options?: string[]; // Optional array of options for the question

    @IsString()
    @IsOptional() // Making this optional
    @IsOption({ message: 'Correct answer must be one of the options' }) // Custom validator to ensure the correct answer is an option
    correctAnswer?: string; // Optional correct answer should match one of the options

    @IsString()
    @IsOptional() // Making this optional
    category?: string; // Optional category field
}