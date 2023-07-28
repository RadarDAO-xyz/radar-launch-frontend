import isTestnet from "@/lib/utils/isTestnet";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { ReactNode, createContext, useEffect, useState } from "react";
import {
  Config,
  PublicClient,
  WagmiConfig,
  WebSocketPublicClient,
  configureChains,
  createConfig,
} from "wagmi";
import { optimism, optimismGoerli } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { isConstructorDeclaration } from "typescript";
import { init } from "next/dist/compiled/@vercel/og/satori";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [isTestnet() ? optimismGoerli : optimism],
  [publicProvider()]
);

const openloginAdapter = new OpenloginAdapter({
  loginSettings: {
    mfaLevel: "mandatory",
  },
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

    // TODO: add social login info here
  },
});
interface Web3ContextType {
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
}

export const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children?: ReactNode }) => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth>();
  const [loggedIn, setLoggedIn] = useState(false);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [wagmiConfig, setWagmiConfig] = useState<
    Config<PublicClient, WebSocketPublicClient>
  >(
    createConfig({
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
    }) as Config<PublicClient, WebSocketPublicClient>
  );

  useEffect(() => {
    const init = async () => {
      const chainConfig = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: isTestnet() ? "0x1a4" : "0xA",
        rpcTarget: `https://optimism-mainnet.infura.io/v3/${process.env.VITE_INFURA_KEY}`,
        displayName: isTestnet() ? "Optimism Testnet" : "Optimism Mainnet",
        blockExplorer: isTestnet()
          ? "https://goerli-optimistic.etherscan.io"
          : "https://optimistic.etherscan.io",
        ticker: "OETH",
        tickerName: "OETH",
      };

      const newWeb3Auth = new Web3Auth({
        clientId: process.env.VITE_WEB3AUTH_CLIENT_ID || "",
        web3AuthNetwork: "cyan",
        chainConfig,
        uiConfig: {
          // theme: "dark",
          loginMethodsOrder: ["google", "email_passwordless"],
        },
      });

      const metamaskAdapter = new MetamaskAdapter({
        clientId: process.env.VITE_WEB3AUTH_CLIENT_ID,
        sessionTime: 86400,
        web3AuthNetwork: "cyan",
        chainConfig,
      });
      // @ts-ignore
      newWeb3Auth.configureAdapter(metamaskAdapter);

      setWeb3Auth(newWeb3Auth);

      await newWeb3Auth.initModal();

      const config = createConfig({
        autoConnect: true,
        publicClient,
        webSocketPublicClient,
        connectors: [
          new Web3AuthConnector({
            chains,
            options: {
              web3AuthInstance: newWeb3Auth,
            },
          }),
          new InjectedConnector({
            chains,
            options: {
              name: "Injected",
              shimDisconnect: true,
            },
          }),
        ],
      });

      setWagmiConfig(config as Config<PublicClient, WebSocketPublicClient>);
    };

    init().catch(console.error);
  }, []);

  const onLogin = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3Auth.connect();
    setProvider(web3authProvider);
    setLoggedIn(true);
  };

  const onLogout = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3Auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  return (
    <Web3Context.Provider value={{ onLogin, onLogout }}>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
    </Web3Context.Provider>
  );
};
