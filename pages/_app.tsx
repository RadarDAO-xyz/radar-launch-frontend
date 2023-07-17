import '@/styles/globals.css';
import '@/devlink/global.css';

import type { AppProps } from 'next/app';
import { DevLinkProvider } from '@/devlink';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <DevLinkProvider>
            <Component {...pageProps} />
        </DevLinkProvider>
    );
}
