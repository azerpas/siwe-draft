import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { WagmiConfig } from 'wagmi';

import { client } from '@/utils/wagmi';

export default function App({ Component, pageProps }: AppProps) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <WagmiConfig client={client}>
            {mounted && <Component {...pageProps} />}
        </WagmiConfig>
    );
}
