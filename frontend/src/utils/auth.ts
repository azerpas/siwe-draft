import { SiweMessage } from 'siwe';
import { ethers } from 'ethers';

const NEXT_PUBLIC_API_URL: string | undefined = process.env.NEXT_PUBLIC_API_URL;
if (!NEXT_PUBLIC_API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is undefined');
}

export async function createSiweMessage(address: string, statement: string) {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/nonce`, {
        credentials: 'include',
    });
    const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement,
        uri: origin,
        version: '1',
        chainId: 1,
        nonce: await res.text(),
    });
    return message.prepareMessage();
}

export async function signUpWithEthereum(
    message: string,
    signature: string,
    username: string,
) {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature, username }),
        credentials: 'include',
    });

    return res.status === 200;
}

export async function signInWithEthereum(message: string, signature: string) {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/user/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
        credentials: 'include',
    });
    console.log(await res.text());
}
