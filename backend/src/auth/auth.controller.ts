import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Get,
    UseGuards,
    Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { User } from '@prisma/client';

@Controller('user')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    async signUp(@Body() signUpDto: Record<string, any>) {
        const { address, message, username, nonce, signature } = signUpDto;
        return this.authService.signUp(
            address,
            message,
            signature,
            nonce,
            username,
        );
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(@Body() signInDto: Record<string, any>) {
        const { address, message, nonce, signature } = signInDto;
        return this.authService.signIn(address, message, signature, nonce);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get('profile')
    getProfile(@Request() req: Request & { user: User }) {
        return req.user;
    }
}
