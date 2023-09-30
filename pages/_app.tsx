import '@/devlink/global.css';
import '@/styles/globals.css';

import { Footer } from '@/components/HomePage/Footer';
import CookieConsent from '@/components/Layout/CookieConsent';
import { NavBar } from '@/components/Layout/NavBar';
import { AuthProvider } from '@/components/Providers/AuthProvider';
import { ThemeProvider } from '@/components/Providers/ThemeProvider';
import { configureChainsConfig } from '@/lib/wagmi';
import { Toaster } from '@/components/ui/toaster';
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import { PrivyProvider } from '@privy-io/react-auth';
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.LIVEPEER_API_KEY!,
  }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-RXHTNDF4RP%22%3E"
      />
      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-RXHTNDF4RP');
        `}
      </Script>
      <Head>
        <DefaultSeo
          canonical="https://radarlaunch.app"
          title="RADAR Launch"
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
        <meta key="keywords" name="keywords" content="radar, nft, launch" />
        <meta key="author" name="author" content="RADAR Launch" />
        <meta charSet="utf-8" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta name="robots" content="index,follow" />
        {/* {process.env.NODE_ENV === 'production' && (
          <base href="https://radarlaunch.app" />
        )} */}

        <link rel="icon" href="/favicon.png" sizes="any" />
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
