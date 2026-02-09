import { Question } from 'src/question/entity/question.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string; // Name of the category

    @OneToMany(() => Question, (question) => question.category) // Define the one-to-many relationship
    questions: Question[]; // Array of related questions

}