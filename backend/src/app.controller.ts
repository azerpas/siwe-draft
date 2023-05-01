import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly userService: UserService,
    ) {}

    @Get('nonce')
    async getNonce(): Promise<string> {
        return this.appService.getNonce();
    }

    @Get('user')
    async getUser(@Query('address') address: string): Promise<string> {
        if (await this.userService.user({ address })) {
            return '';
        } else {
            throw new NotFoundException();
        }
    }

    @Get('users')
    async signupUser(): Promise<User[]> {
        return this.userService.users({});
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
