import "@/devlink/global.css";
import "@/styles/globals.css";

import { AuthProvider } from "@/components/AuthProvider";
import { PreLaunchFooter } from "@/components/Layout/PreLaunchFooter";
import { NavBar } from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";

const Web3ProviderNoSSR = dynamic(
  () => import("@/components/Web3Provider").then((mod) => mod.Web3Provider),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ProviderNoSSR>
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
    </Web3ProviderNoSSR>
  );
}
