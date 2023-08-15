import "@/devlink/global.css";
import "@/styles/globals.css";

import { AuthProvider } from "@/components/Providers/AuthProvider";
import { PreLaunchFooter } from "@/components/HomePage/PreLaunchFooter";
import { NavBar } from "@/components/Layout/NavBar";
import { Toaster } from "@/components/ui/toaster";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";

const Web3ProviderNoSSR = dynamic(
  () =>
    import("@/components/Providers/Web3Provider").then(
      (mod) => mod.Web3Provider
    ),
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
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthProvider>
          <NavBar />
          <Component {...pageProps} />
          <PreLaunchFooter />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </Web3ProviderNoSSR>
  );
}
