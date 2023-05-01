import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';
import { generateNonce, SiweMessage } from 'siwe';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signUp(
        address: string,
        message: string,
        signature: string,
        nonce: string,
        username: string,
    ): Promise<any> {
        const SIWEObject = new SiweMessage(message);
        console.log(`address: ${address}`);
        console.log(`message: ${message}`);
        console.log(`username: ${username}`);
        console.log(`nonce: ${nonce}`);
        console.log(`signature: ${signature}`);
        const verified = await SIWEObject.verify({ nonce, signature });
        if (!verified) {
            throw new UnauthorizedException('Signature is not valid');
        }
        const user = await this.userService.createUser({
            address,
            username,
        });
        const payload: User = { username: user.username, id: user.id, address };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signIn(
        address: string,
        message: string,
        signature: string,
        nonce: string,
    ) {
        const SIWEObject = new SiweMessage(message);
        const verified = await SIWEObject.verify({ nonce, signature });
        if (!verified) {
            throw new UnauthorizedException('Signature is not valid');
        }
        const user = await this.userService.user({ address });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const payload: User = { username: user.username, id: user.id, address };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
