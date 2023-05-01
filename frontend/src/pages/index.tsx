import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Account, Connect } from '@/components';
import { useAccount } from 'wagmi';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const { isConnected } = useAccount();
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                <div className={styles.description}>
                    <p>
                        Get started by editing&nbsp;
                        <code className={styles.code}>src/pages/index.tsx</code>
                        <Connect />
                        {isConnected && (
                            <>
                                <Account />
                            </>
                        )}
                    </p>
                </div>
            </main>
        </>
    );
}
