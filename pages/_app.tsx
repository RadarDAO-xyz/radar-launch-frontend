import "@/styles/globals.css";
import "@/devlink/global.css";

import type { AppProps } from "next/app";
import { DevLinkProvider, PreLaunchFooter } from "@/devlink";
import dynamic from "next/dynamic";

const NavBarWithNoSSR = dynamic(
  () => import("@/devlink/NavBar").then((res) => res.NavBar),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DevLinkProvider>
      <NavBarWithNoSSR />
      <Component {...pageProps} />
      <PreLaunchFooter />
    </DevLinkProvider>
  );
}
