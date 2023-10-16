import '@/devlink/global.css';
import '@/styles/globals.css';

import { Footer } from '@/components/HomePage/Footer';
import CookieConsent from '@/components/Layout/CookieConsent';
import { NavBar } from '@/components/Layout/NavBar';
import { AuthProvider } from '@/components/Providers/AuthProvider';
import { ThemeProvider } from '@/components/Providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { configureChainsConfig } from '@/lib/wagmi';
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import { PrivyProvider } from '@privy-io/react-auth';
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.LIVEPEER_API_KEY!,
  }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <DefaultSeo
          canonical="https://radarlaunch.app"
          title="RADAR Launch"
          defaultTitle="RADAR Launch"
          openGraph={{
            title: 'RADAR Launch',
            url: 'https://radarlaunch.app',
            type: 'website',
            images: [
              {
                url: 'https://radarlaunch.app/project-image.png',
                alt: 'RADAR Launch',
              },
            ],
            description:
              'RADAR Launch is a platform for future makers and early adopters',
            siteName: 'RADAR Launch',
            locale: 'en_US',
          }}
          twitter={{
            cardType: 'summary_large_image',
            site: 'https://radarlaunch.app',
            handle: '@Radarxyz',
          }}
        />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="light" themes={['light']}>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
          onSuccess={console.log}
          config={{
            loginMethods: ['email', 'wallet'],
            appearance: {
              theme: 'light',
              accentColor: '#676FFF',
              logo: '/logo.png',
              showWalletLoginFirst: true,
            },
            embeddedWallets: {
              createOnLogin: 'users-without-wallets',
            },
          }}
        >
          <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
            <AuthProvider>
              <LivepeerConfig client={livepeerClient}>
                <NavBar />
                <Component {...pageProps} />
                <Footer />
                <Toaster />
                <CookieConsent />
              </LivepeerConfig>
            </AuthProvider>
          </PrivyWagmiConnector>
        </PrivyProvider>
      </ThemeProvider>
    </>
  );
}
