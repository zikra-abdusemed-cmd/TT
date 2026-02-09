// src/result/result.controller.ts
import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { ResultService } from './result.service';
import { SaveResultDto } from './dto/save-results.dto';
import { Result } from './entity/result.entity';

@Controller('results')
export class ResultController {
    constructor(private readonly resultService: ResultService) {}

    // Save a new result
    @Post()
    async saveResult(@Body() saveResultDto: SaveResultDto): Promise<Result> {
        return this.resultService.saveResult(saveResultDto);
    }

    // Retrieve all results for a specific user
    @Get('user/:userId')
    async findByUserId(@Param('userId') userId: string): Promise<Result[]> {
        return this.resultService.findByUserId(userId);
    }

    // Retrieve all results for a specific category
    @Get('category/:categoryId')
    async findByCategoryId(@Param('categoryId') categoryId: string): Promise<Result[]> {
        return this.resultService.findByCategoryId(categoryId);
    }

    // Retrieve a specific result by ID
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Result> {
        return this.resultService.findOne(id);
    }

    // Leaderboard endpoint
    @Get()
    async getLeaderboard(
        @Query('leaderboard') leaderboardFlag?: string,
        @Query('limit') limit?: string,
    ) {
        // When ?leaderboard=true is passed, return the leaderboard instead of raw results list
        if (leaderboardFlag === 'true') {
            const size = limit ? parseInt(limit, 10) : 10;
            return this.resultService.getLeaderboard(size);
        }

        // Fallback: return all results if needed in the future
        // For now we keep behavior minimal and focused on the leaderboard.
        return [];
    }
}