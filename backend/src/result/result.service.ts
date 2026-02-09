// src/result/result.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entity/result.entity';
import { SaveResultDto } from './dto/save-results.dto';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class ResultService {
    constructor(
        @InjectRepository(Result)
        private readonly resultRepository: Repository<Result>,
    ) {}

    // Save a new result
    async saveResult(saveResultDto: SaveResultDto): Promise<Result> {
        const result = this.resultRepository.create(saveResultDto);
        return this.resultRepository.save(result);
    }

    // Retrieve all results for a specific user
    async findByUserId(userId: string): Promise<Result[]> {
        return this.resultRepository.find({ where: { userId } });
    }

    // Retrieve all results for a specific category
    async findByCategoryId(categoryId: string): Promise<Result[]> {
        return this.resultRepository.find({ where: { categoryId } });
    }

    // Retrieve a specific result by ID
    async findOne(id: string): Promise<Result> {
        const result = await this.resultRepository.findOne({ where: { id } });
        if (!result) {
            throw new NotFoundException('Result not found');
        }
        return result;
    }

    /**
     * Leaderboard: aggregate results per user ordered by highest total score.
     *
     * Returns an array of objects with:
     *  - userId
     *  - username
     *  - totalScore
     *  - gamesPlayed
     */
    async getLeaderboard(limit = 10): Promise<
        Array<{
            userId: string;
            username: string;
            totalScore: number;
            gamesPlayed: number;
        }>
    > {
        const rows = await this.resultRepository
            .createQueryBuilder('result')
            .leftJoin(User, 'user', 'user.id = result.userId')
            .select('user.id', 'userId')
            .addSelect('user.username', 'username')
            .addSelect('SUM(result.score)', 'totalScore')
            .addSelect('COUNT(*)', 'gamesPlayed')
            .groupBy('user.id')
            .addGroupBy('user.username')
            .orderBy('totalScore', 'DESC')
            .limit(limit)
            .getRawMany<{
                userId: string;
                username: string;
                totalScore: string;
                gamesPlayed: string;
            }>();

        return rows.map((row) => ({
            userId: row.userId,
            username: row.username,
            totalScore: Number(row.totalScore),
            gamesPlayed: Number(row.gamesPlayed),
        }));
    }
}