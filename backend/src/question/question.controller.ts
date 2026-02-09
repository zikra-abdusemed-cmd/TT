// src/question/question.controller.ts

import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entity/question.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Assuming you have JWT auth guard
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    // Admin only: Create a new question

    @Post()
    async create(
        @Body() createQuestionDto: CreateQuestionDto, 
        @Request() req: any
    ): Promise<Question> {
        return this.questionService.create(createQuestionDto, req.user); // Pass the user from the request
    }

    // Retrieve all questions (accessible to all users)
    @Get()
    async findAll(): Promise<Question[]> {
        return this.questionService.findAll();
    }

    // Retrieve a specific question by ID
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Question> {
        return this.questionService.findOne(id);
    }

    // Update a question (Admin only)
    @Patch(':id')
    async update(
        @Param('id') id: number, 
        @Body() updateQuestionDto: UpdateQuestionDto, 
        @Request() req: any
    ): Promise<Question> {
        return this.questionService.update(id, updateQuestionDto, req.user);
    }

    // Delete a question (Admin only)
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req: any): Promise<void> {
        return this.questionService.remove(id, req.user);
    }
}