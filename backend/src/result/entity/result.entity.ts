// src/result/result.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('results')
export class Result {
    @PrimaryGeneratedColumn()
    id: string; // Unique identifier for the result

    @Column()
    userId: string; // ID of the user

    @Column()
    categoryId: string; // ID of the category

    @Column()
    score: number; // Score achieved

    @Column()
    totalQuestions: number; // Total number of questions in the quiz

    @Column()
    quizId: string; // ID of the quiz

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date; // Timestamp of when the result was saved
}