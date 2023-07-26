import "@/devlink/global.css";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { DevLinkProvider, PreLaunchFooter } from "@/devlink";
import { NavBar } from "@/components/NavBar";
import { Web3Provider } from "@/components/Web3Provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <DevLinkProvider>
        <NavBar />
        <Component {...pageProps} />
        <PreLaunchFooter />
      </DevLinkProvider>
    </Web3Provider>
  );
}
