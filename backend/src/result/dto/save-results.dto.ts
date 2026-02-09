// src/result/dto/save-result.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class SaveResultDto {
    @IsString()
    @IsNotEmpty()
    userId: string; // ID of the user taking the quiz

    @IsString()
    @IsNotEmpty()
    categoryId: string; // ID of the category for the quiz

    @IsNumber()
    @IsNotEmpty()
    score: number; // Score achieved by the user

    @IsNumber()
    @IsNotEmpty()
    totalQuestions: number; // Total number of questions in the quiz

    @IsString()
    @IsNotEmpty()
    quizId: string; // ID of the quiz taken
}