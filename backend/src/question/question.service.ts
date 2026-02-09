// src/question/question.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entity/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
    ) {}

    // Admin only: Create a new question
    async create(createQuestionDto: CreateQuestionDto, user: any): Promise<Question> {
        // Check if the user is an admin
    
        const question = this.questionRepository.create(createQuestionDto);
        return this.questionRepository.save(question);
    }

    // Retrieve all questions (accessible to all users)
    async findAll(): Promise<Question[]> {
        return this.questionRepository.find();
    }

    // Retrieve a specific question by ID
    async findOne(id: number): Promise<Question> { // Change id to number
        const question = await this.questionRepository.findOne({ where: { id } });

        if (!question) {
            throw new NotFoundException('Question not found');
        }
        return question;
    }

    // Admin only: Update a question
    async update(id: number, updateQuestionDto: UpdateQuestionDto, user: any): Promise<Question> {
      
        const question = await this.findOne(id); // Check if the question exists

        // Update only the fields provided in the updateQuestionDto
        if (updateQuestionDto.content) {
            question.content = updateQuestionDto.content;
        }
        if (updateQuestionDto.options) {
            question.options = updateQuestionDto.options;
        }
        if (updateQuestionDto.correctAnswer) {
            question.correctAnswer = updateQuestionDto.correctAnswer;
        }
        if (updateQuestionDto.category) {
            question.category = updateQuestionDto.category;
        }

        return this.questionRepository.save(question);
    }

    // Admin only: Delete a question
    async remove(id: number, user: any): Promise<void> { // Change id to number
    

        const question = await this.findOne(id); // Check if the question exists
        await this.questionRepository.remove(question);
    }

    // Admin only: Add multiple questions
    async addQuestions(questions: Partial<Question>[]): Promise<void> {
        const questionEntities = this.questionRepository.create(questions);
        await this.questionRepository.save(questionEntities);
        console.log('Questions added successfully.');
    }
}