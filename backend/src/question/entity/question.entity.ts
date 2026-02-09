import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questions') // Table name in the database
export class Question {
    @PrimaryGeneratedColumn() // Automatically generate a unique ID
    id: number;

    @Column('text') // Store the content of the question
    content: string;

    @Column('text', { array: true }) // Store options as an array
    options: string[];

    @Column('text') // Store the correct answer
    correctAnswer: string;

    @Column('text',{ nullable: true }) // Optional category field
    category: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Timestamp for creation
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true }) // Optional timestamp for last update
    updatedAt?: Date;
}