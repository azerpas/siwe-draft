import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SiweMessage } from 'siwe';
import { AuthService } from './auth.service';

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
            nonce,
            signature,
            username,
        );
    }

    @Post('signin')
    async signIn() {
        return 'signIn';
    }
}
