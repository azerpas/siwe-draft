import { SiweMessage } from 'siwe';

const NEXT_PUBLIC_API_URL: string | undefined = process.env.NEXT_PUBLIC_API_URL;
if (!NEXT_PUBLIC_API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is undefined');
}

export async function createSiweMessage(address: string, statement: string) {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/nonce`);
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
    address: string,
) {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature, username, address }),
    });

    if (res.status === 200) {
        // save access token to session storage
        const response = await res.json();
        sessionStorage.setItem('accessToken', response.access_token);
    }

    return res.status === 200;
}

export async function signInWithEthereum(
    message: string,
    signature: string,
    address: string,
) {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/user/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature, address }),
    });

    if (res.status === 200) {
        const response = await res.json();
        sessionStorage.setItem('accessToken', response.access_token);
    }

    return res.status === 200;
}

export async function getProfile() {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/user/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
    });
    return res.json();
}

export async function userExists(address: string) {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/user?address=${address}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res.status === 200;
}
