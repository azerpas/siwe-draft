import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService, UserService, PrismaService],
})
export class AuthModule {}
