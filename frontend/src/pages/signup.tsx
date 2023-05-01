import { useEffect, useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { getNonce } from '../utils/nonce';
// import { signUpWithEthereum } from '../utils/auth';
import React from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { createSiweMessage } from '@/utils/auth';

type FormValues = {
    username: string;
};

function SignUp() {
    const { isConnected, connector, address } = useAccount()
    const { signMessageAsync } = useSignMessage()
    const {
        register,
        handleSubmit,
        formState: { errors }, 
        setError
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
        await signMessageAsync({ message })

    });

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">Username</label>
                <input {...register('username')} placeholder="@azerpas" />
                {errors?.username && <p>{errors.username.message}</p>}

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;