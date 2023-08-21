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
import CookieConsent from "@/components/Layout/CookieConsent";

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
        <meta name="keywords" content="radar, nft, launch" />
        <meta name="author" content="RADAR Launch" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="RADAR Launch" />
        <meta
          property="og:description"
          content="Launch your projects with RADAR"
        />
        <meta property="og:site_name" content="RADAR Launch" />
        <meta
          property="og:image"
          content="https://radarlaunch.app/project-image.png"
        />

        <meta name="twitter:title" content="RADAR Launch" />
        <meta
          name="twitter:description"
          content="Launch your projects with RADAR"
        />
        <meta
          name="twitter:image"
          content=" https://radarlaunch.app/project-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Radarxyz" />

        <link rel="icon" href="/favicon.png" sizes="any" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="light" themes={["light"]}>
        <AuthProvider>
          <NavBar />
          <Component {...pageProps} />
          <PreLaunchFooter />
          <Toaster />
          <CookieConsent />
        </AuthProvider>
      </ThemeProvider>
    </Web3ProviderNoSSR>
  );
}
