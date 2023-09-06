import isTestnet from '@/lib/isTestnet';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { MetamaskAdapter } from '@web3auth/metamask-adapter';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { optimism, optimismGoerli } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [isTestnet() ? optimismGoerli : optimism],
  [publicProvider(), infuraProvider({ apiKey: process.env.VITE_INFURA_KEY! })],
);

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    uxMode: 'popup',
    whiteLabel: {
      name: 'RADAR Launch',
      url: 'https://radarlaunch.app',
      logoLight: 'https://radarlaunch.app/project-image.png',
      logoDark: 'https://radarlaunch.app/project-image.png',
      defaultLanguage: 'en', // en, de, ja, ko, zh, es, fr, pt, nl
      dark: false, // whether to enable dark mode. defaultValue: false
      theme: {
        primary: '#00B4FF',
      },
    },
    network: isTestnet() ? 'testnet' : 'cyan',
  },
});

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  rpcTarget: chains[0].rpcUrls.default.http[0],
  chainId: '0x' + chains[0].id.toString(16),
  displayName: chains[0].name,
  tickerName: chains[0].nativeCurrency?.name,
  ticker: chains[0].nativeCurrency?.symbol,
  blockExplorer: chains[0]?.blockExplorers.default?.url,
};

const metamaskAdapter = new MetamaskAdapter({
  clientId: process.env.VITE_WEB3AUTH_CLIENT_ID,
  sessionTime: 86400,
  web3AuthNetwork: isTestnet() ? 'testnet' : 'cyan',
  chainConfig,
});

interface Web3ContextType {
  web3Auth?: Web3Auth;
  setWeb3Auth: Dispatch<SetStateAction<Web3Auth | undefined>>;
  web3AuthConnecter?: Web3AuthConnector;
}

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
});

export const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children?: ReactNode }) => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth>();
  const [web3AuthConnecter, setWeb3AuthConnector] =
    useState<Web3AuthConnector>();

  useEffect(() => {
    const init = async () => {
      const newWeb3Auth = new Web3Auth({
        clientId: process.env.VITE_WEB3AUTH_CLIENT_ID!,
        web3AuthNetwork: 'cyan',
        chainConfig,
        uiConfig: {
          loginMethodsOrder: ['google', 'email_passwordless'],
          appName: 'blockchain',
          appLogo: 'https://radarlaunch.app/project-image.png',
        },
      });

      newWeb3Auth.configureAdapter(openloginAdapter);

      newWeb3Auth.configureAdapter(metamaskAdapter);

      setWeb3Auth(newWeb3Auth);

      await newWeb3Auth.initModal();

      setWeb3AuthConnector(
        new Web3AuthConnector({
          options: {
            web3AuthInstance: newWeb3Auth!,
          },
        }),
      );
    };

    init().catch(console.error);
  }, []);

  return (
    <Web3Context.Provider value={{ web3Auth, setWeb3Auth, web3AuthConnecter }}>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
    </Web3Context.Provider>
  );
};
