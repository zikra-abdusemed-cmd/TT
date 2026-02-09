// src/question/question.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './entity/question.entity';// Import the Question entity

@Module({
  imports: [TypeOrmModule.forFeature([Question])], // Register the Question entity for use with TypeORM
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}