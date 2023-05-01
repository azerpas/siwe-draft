import { useForm } from 'react-hook-form';
import styles from '@/styles/Home.module.css';
import { Inter } from 'next/font/google';
import React from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { createSiweMessage, signUpWithEthereum } from '@/utils/auth';
import { Connect } from '@/components';
import { useRouter } from 'next/router';

type FormValues = {
    username: string;
};

const inter = Inter({ subsets: ['latin'] });

function SignUp() {
    const { isConnected, address } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormValues>();

    const onSubmit = handleSubmit(async (data) => {
        if (!isConnected || !address) {
            setError('username', { message: 'Please connect your wallet' });
            return;
        }
        const message = await createSiweMessage(
            address,
            `Sign up for ${data.username}`,
        );
        const signature = await signMessageAsync({ message });
        const res = await signUpWithEthereum(message, signature, data.username);
        if (res) {
            router.push('/dashboard');
        }
    });

    return (
        <>
            <main className={`${styles.main} ${inter.className}`}>
                <div>
                    <h1>Sign Up</h1>
                    {!isConnected && (
                        <>
                            <p>Start by connecting your wallet</p>
                            <Connect />
                        </>
                    )}
                    {isConnected && (
                        <form onSubmit={onSubmit}>
                            <label htmlFor="username">Username</label>
                            <input
                                {...register('username')}
                                placeholder="@azerpas"
                            />
                            {errors?.username && (
                                <p>{errors.username.message}</p>
                            )}

                            <button type="submit">Sign Up</button>
                        </form>
                    )}
                </div>
            </main>
        </>
    );
}

export default SignUp;
