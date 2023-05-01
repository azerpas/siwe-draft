import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { generateNonce, SiweMessage } from 'siwe';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async signIn(
        address: string,
        message: string,
        signature: string,
        nonce: string,
    ): Promise<any> {
        const SIWEObject = new SiweMessage(message);
        const verified = await SIWEObject.verify({ nonce, signature });
        const user = await this.userService.user({
            address,
        });
        /*
        if (user?.password !== pass) {
        throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        */
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return 2;
    }
}
