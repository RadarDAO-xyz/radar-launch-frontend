import "@/devlink/global.css";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { DevLinkProvider, PreLaunchFooter } from "@/devlink";
import { NavBar } from "@/components/NavBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DevLinkProvider>
      <NavBar />
      <Component {...pageProps} />
      <PreLaunchFooter />
    </DevLinkProvider>
  );
}
