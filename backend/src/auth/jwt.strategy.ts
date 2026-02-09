// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Use the same JWT secret as in AuthModule, coming from .env
            secretOrKey: process.env.JWT_SECRET || 'your_secret_key',
        });
    }

    async validate(payload: any) {
        return this.usersService.getUserById(payload.sub); // Assuming you have a method to find user by ID
    }
}