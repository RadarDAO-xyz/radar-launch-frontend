import "@/devlink/global.css";
import "@/styles/globals.css";

import { AuthProvider } from "@/components/AuthProvider";
import { NavBar } from "@/components/NavBar";
import { Web3Provider } from "@/components/Web3Provider";
import { Toaster } from "@/components/ui/toaster";
import type { AppProps } from "next/app";
import Script from "next/script";
import Head from "next/head";
import { PreLaunchFooter } from "@/components/Layout/PreLaunchFooter";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
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
        <title>RADAR Launch</title>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </Head>
      <AuthProvider>
        <NavBar />
        <Component {...pageProps} />
        <PreLaunchFooter />
        <Toaster />
      </AuthProvider>
    </Web3Provider>
  );
}
