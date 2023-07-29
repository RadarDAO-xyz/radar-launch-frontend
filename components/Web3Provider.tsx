import isTestnet from "@/lib/utils/isTestnet";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { ReactNode, createContext, useEffect, useState } from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { optimism, optimismGoerli } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [isTestnet() ? optimismGoerli : optimism],
  [publicProvider()]
);

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    uxMode: "popup",
    whiteLabel: {
      name: "RADARDao Launch",
      url: "https://radar-launch.netlify.app",
      logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
      logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
      defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
      dark: true, // whether to enable dark mode. defaultValue: false
      theme: {
        primary: "#00B4FF",
      },
    },
    network: isTestnet() ? "testnet" : "cyan",
  },
});

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  rpcTarget: chains[0].rpcUrls.default.http[0],
  // rpcTarget: isTestnet()
  //   ? `https://optimism-goerli.infura.io/v3/${process.env.VITE_INFURA_KEY}`
  //   : `https://optimism-mainnet.infura.io/v3/${process.env.VITE_INFURA_KEY}`,
  chainId: "0x" + chains[0].id.toString(16),
  displayName: chains[0].name,
  tickerName: chains[0].nativeCurrency?.name,
  ticker: chains[0].nativeCurrency?.symbol,
  blockExplorer: chains[0]?.blockExplorers.default?.url,
};

const metamaskAdapter = new MetamaskAdapter({
  clientId: process.env.VITE_WEB3AUTH_CLIENT_ID,
  sessionTime: 86400,
  web3AuthNetwork: isTestnet() ? "testnet" : "cyan",
  chainConfig,
});

interface Web3ContextType {
  web3Auth?: Web3Auth;
}

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
});

export const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children?: ReactNode }) => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth>();

  useEffect(() => {
    const init = async () => {
      // @ts-ignore
      const newWeb3Auth = new Web3Auth({
        clientId: process.env.VITE_WEB3AUTH_CLIENT_ID || "",
        web3AuthNetwork: "cyan",
        chainConfig,
        uiConfig: {
          // theme: "dark",
          loginMethodsOrder: ["google", "email_passwordless"],
        },
      });

      newWeb3Auth.configureAdapter(openloginAdapter);

      newWeb3Auth.configureAdapter(metamaskAdapter);

      setWeb3Auth(newWeb3Auth);

      await newWeb3Auth.initModal();
    };

    init().catch(console.error);
  }, []);

  return (
    <Web3Context.Provider value={{ web3Auth }}>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
    </Web3Context.Provider>
  );
};
