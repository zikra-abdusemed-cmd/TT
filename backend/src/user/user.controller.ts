// src/user/user.controller.ts
import { Controller, Get, Patch, Body, Param, UseGuards, Request, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entity/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Assuming you have a JWT guard

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update-password')
    async updatePassword(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto): Promise<void> {
        const userId = req.user.sub; // Assuming user ID is stored in the JWT payload
        await this.userService.updatePassword(userId, updatePasswordDto);
    }

    @Post('add-admins')
    async addAdmins(): Promise<void> {
        await this.userService.addAdminUsers();
    }
}