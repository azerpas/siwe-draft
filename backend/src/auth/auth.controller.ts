import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
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
            signature,
            nonce,
            username,
        );
    }

    @Post('signin')
    async signIn() {
        return 'signIn';
    }
}
