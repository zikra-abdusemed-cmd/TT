// src/result/result.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entity/result.entity';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Result])],
    providers: [ResultService],
    controllers: [ResultController],
})
export class ResultModule {}