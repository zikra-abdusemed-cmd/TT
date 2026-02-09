// src/question/dto/create-question.dto.ts
import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { IsOption } from '../validators/is-option.validator'; // Adjust the path as necessary

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    content: string; // Main content of the question

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    options: string[]; // Array of options for the question

    @IsString()
    @IsNotEmpty()
    @IsOption({ message: 'Correct answer must be one of the options' }) // Custom validator to ensure the correct answer is an option
    correctAnswer: string; // Correct answer should match one of the options

    @IsString()
    category: string; // Optional category field
}