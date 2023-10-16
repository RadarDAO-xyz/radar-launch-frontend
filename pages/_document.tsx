import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
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
        <meta key="keywords" name="keywords" content="radar, nft, launch" />
        <meta key="author" name="author" content="RADAR Launch" />
        <meta charSet="utf-8" />
        <meta name="robots" content="index,follow" />
        {process.env.NODE_ENV === 'production' && (
          <base href="https://radarlaunch.app" />
        )}

        <link rel="icon" href="/favicon.png" sizes="any" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
