import { Account } from '@/components';
import { Html, Head, Main, NextScript } from 'next/document';
import { useAccount } from 'wagmi';

export default function Document() {
    const { isConnected } = useAccount();
    return (
        <Html lang="en">
            <Head />
            <body>
                {isConnected && (
                    <>
                        <Account />
                    </>
                )}
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
