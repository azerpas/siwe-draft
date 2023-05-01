import styles from '@/styles/Home.module.css';
import { getProfile } from '@/utils/auth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';

function SignUp() {
    const { isConnected, address } = useAccount();
    const [profile, setProfile] = React.useState<any>(null);
    const router = useRouter();
    useEffect(() => {
        if (isConnected && address && sessionStorage.getItem('accessToken')) {
            getProfile().then((profile) => {
                setProfile(profile);
            });
        }
        if (
            !isConnected ||
            !address ||
            !sessionStorage.getItem('accessToken')
        ) {
            router.push('/signup');
        }
    }, [isConnected, address]);
    return (
        <>
            <main className={`${styles.main}`}>
                <div>
                    <h1>Profile</h1>
                    {profile && (
                        <>
                            <p>Username: {profile.username}</p>
                            <p>Address: {profile.address}</p>
                        </>
                    )}
                </div>
            </main>
        </>
    );
}

export default SignUp;
