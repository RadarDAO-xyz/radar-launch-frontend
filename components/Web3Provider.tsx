import {
  Web3AuthEventListener,
  Web3AuthModalPack,
} from "@safe-global/auth-kit";
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { ReactNode, createContext, useEffect, useState } from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { optimism } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { publicClient, webSocketPublicClient } = configureChains(
  [optimism],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

const modalConfig = {
  [WALLET_ADAPTERS.METAMASK]: {
    label: "MetaMask",
    showOnDesktop: true,
    showOnMobile: false,
  },
};

const openloginAdapter = new OpenloginAdapter({
  loginSettings: {
    mfaLevel: "mandatory",
  },
  adapterSettings: {
    uxMode: "popup",
    whiteLabel: {
      name: "Safe",
    },
    // TODO: add social login info here
  },
});

interface Web3ContextType {
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
  provider?: SafeEventEmitterProvider;
}

export const Web3Context = createContext<Web3ContextType | null>(null);

const connectedHandler: Web3AuthEventListener = (data) =>
  console.log("CONNECTED", data);
const disconnectedHandler: Web3AuthEventListener = (data) =>
  console.log("DISCONNECTED", data);

export const Web3Provider = ({ children }: { children?: ReactNode }) => {
  const [web3AuthModalPack, setWeb3AuthModalPack] = useState<Web3AuthModalPack>(
    new Web3AuthModalPack({
      txServiceUrl: "https://safe-transaction-optimism.safe.global",
    })
  );
  const [provider, setProvider] = useState<SafeEventEmitterProvider>();

  useEffect(() => {
    web3AuthModalPack
      .init({
        options: {
          clientId: process.env.VITE_WEB3AUTH_CLIENT_ID || "",
          web3AuthNetwork: "cyan",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0xA",
            rpcTarget: `https://optimism-mainnet.infura.io/v3/${process.env.VITE_INFURA_KEY}`,
            displayName: "Optimism Mainnet",
            blockExplorer: "https://optimistic.etherscan.io",
            ticker: "OP",
            tickerName: "OP",
          },
          uiConfig: {
            // theme: "dark",
            loginMethodsOrder: ["google", "email_passwordless"],
          },
        },
        // @ts-ignore
        adapters: [openloginAdapter],
        modalConfig,
      })
      .then(() => {
        web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);

        web3AuthModalPack.subscribe(
          ADAPTER_EVENTS.DISCONNECTED,
          disconnectedHandler
        );

        setWeb3AuthModalPack(web3AuthModalPack);
      });
  }, []);

  useEffect(() => {
    if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
      void onLogin();
    }
  }, [web3AuthModalPack]);

  const onLogin = async () => {
    if (!web3AuthModalPack) return;

    const signInInfo = await web3AuthModalPack.signIn();
    console.log("SIGN IN RESPONSE: ", signInInfo);

    const userInfo = await web3AuthModalPack.getUserInfo();
    console.log("USER INFO: ", userInfo);

    setProvider(web3AuthModalPack.getProvider() as SafeEventEmitterProvider);
  };

  const onLogout = async () => {
    if (!web3AuthModalPack) return;

    setProvider(undefined);
    await web3AuthModalPack.signOut();
  };

  return (
    <Web3Context.Provider value={{ onLogin, onLogout, provider }}>
      <WagmiConfig config={config}>{children}</WagmiConfig>
    </Web3Context.Provider>
  );
};
