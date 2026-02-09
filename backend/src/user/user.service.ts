import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entity/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getUserById(userId: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isMatch = await bcrypt.compare(updatePasswordDto.currentPassword, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Current password is incorrect');
        }

        user.password = await bcrypt.hash(updatePasswordDto.newPassword, 10);
        await this.userRepository.save(user);
    }

    async addAdminUsers(): Promise<void> {
        const adminUsers = [
            { username: 'Hayat', email: 'hayat@example.com', password: 'securePassword1' },
            { username: 'Zikra', email: 'zikra@example.com', password: 'securePassword2' },
            { username: 'Sinsine', email: 'sinsine@example.com', password: 'securePassword3' },
            { username: 'Semer', email: 'semer@example.com', password: 'securePassword4' },
        ];

        for (const admin of adminUsers) {
            const existingUser = await this.userRepository.findOne({ where: { email: admin.email } });
            if (!existingUser) {
                const newUser = this.userRepository.create();
                newUser.username = admin.username;
                newUser.email = admin.email;
                newUser.password = await bcrypt.hash(admin.password, 10); // Hash the password
                newUser.isActive = true; // Set to true or false as needed
                newUser.role = UserRole.ADMIN; // Assuming you have a role field in User entity

                await this.userRepository.save(newUser);
                console.log(`Admin user ${admin.username} added.`);
            } else {
                console.log(`User with email ${admin.email} already exists.`);
            }
        }
    }
}