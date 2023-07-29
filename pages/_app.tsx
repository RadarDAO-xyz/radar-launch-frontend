import "@/devlink/global.css";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { DevLinkProvider, PreLaunchFooter } from "@/devlink";
import { NavBar } from "@/components/NavBar";
import { Web3Provider } from "@/components/Web3Provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <DevLinkProvider>
        <AuthProvider>
          <NavBar />
          <Component {...pageProps} />
          <PreLaunchFooter />
          <Toaster />
        </AuthProvider>
      </DevLinkProvider>
    </Web3Provider>
  );
}
