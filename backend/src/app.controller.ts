import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly userService: UserService,
        private authService: AuthService,
    ) {}

    @Get('nonce')
    async getNonce(): Promise<string> {
        return this.appService.getNonce();
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('users')
    async signupUser(): Promise<User[]> {
        return this.userService.users({});
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: Request & { user: User }) {
        return req.user;
    }
}
