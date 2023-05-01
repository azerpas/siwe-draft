import { useForm } from 'react-hook-form';
import styles from '@/styles/Home.module.css';
import { Inter } from 'next/font/google';
import React, { useEffect } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import {
    createSiweMessage,
    signInWithEthereum,
    userExists,
} from '@/utils/auth';
import { Connect } from '@/components';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

function SignIn() {
    const { isConnected, address } = useAccount();
    const [error, setError] = React.useState<string | null>(null);
    const { signMessageAsync } = useSignMessage();
    const router = useRouter();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isConnected || !address) {
            setError('Please connect your wallet');
            return;
        }
        const message = await createSiweMessage(
            address,
            `Sign In for ${address}`,
        );
        const signature = await signMessageAsync({ message });
        const res = await signInWithEthereum(message, signature, address);
        if (res) {
            router.push('/profile');
        }
    };

    useEffect(() => {
        if (isConnected && address) {
            userExists(address).catch((_) => {
                router.push('/signup');
            });
        }
    }, [isConnected, address]);

    return (
        <>
            <main className={`${styles.main} ${inter.className}`}>
                <div>
                    <h1>Sign In</h1>
                    {!isConnected && (
                        <>
                            <p>Start by connecting your wallet</p>
                            <Connect />
                        </>
                    )}
                    {isConnected && (
                        <form onSubmit={onSubmit}>
                            <button type="submit">Sign In</button>
                            {error && <p>{error}</p>}
                        </form>
                    )}
                </div>
            </main>
        </>
    );
}

export default SignIn;
