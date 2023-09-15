import '@/devlink/global.css';
import '@/styles/globals.css';

import { Footer } from '@/components/HomePage/Footer';
import CookieConsent from '@/components/Layout/CookieConsent';
import { NavBar } from '@/components/Layout/NavBar';
import { AuthProvider } from '@/components/Providers/AuthProvider';
import { ThemeProvider } from '@/components/Providers/ThemeProvider';
import { Web3Provider } from '@/components/Providers/Web3Provider';
import { Toaster } from '@/components/ui/toaster';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { DefaultSeo, NextSeo } from 'next-seo';

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
        {process.env.NODE_ENV === 'production' && (
          <base href="https://radarlaunch.app" />
        )}

        <link rel="icon" href="/favicon.png" sizes="any" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="light" themes={['light']}>
        <Web3Provider>
          <AuthProvider>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
            <Toaster />
            <CookieConsent />
          </AuthProvider>
        </Web3Provider>
      </ThemeProvider>
    </>
  );
}
