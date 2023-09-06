import isTestnet from '@/lib/isTestnet';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { optimism, optimismGoerli } from 'wagmi/chains';
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

interface Web3ContextType {
  web3Auth?: Web3Auth;
}

export const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children?: ReactNode }) => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth>();
  const [wagmiConfig, setWagmiConfig] = useState(
    createConfig({
      autoConnect: true,
      publicClient,
      webSocketPublicClient,
      connectors: [],
    }),
  );

  useEffect(() => {
    const init = async () => {
      const web3AuthInstance = new Web3Auth({
        clientId: process.env.VITE_WEB3AUTH_CLIENT_ID!,
        web3AuthNetwork: 'cyan',
        chainConfig,
        uiConfig: {
          loginMethodsOrder: ['google', 'email_passwordless'],
          appName: 'blockchain',
          appLogo: 'https://radarlaunch.app/project-image.png',
        },
      });

      web3AuthInstance.configureAdapter(openloginAdapter);

      setWeb3Auth(web3AuthInstance);

      await web3AuthInstance.initModal();
      setWagmiConfig(
        createConfig({
          autoConnect: true,
          publicClient,
          webSocketPublicClient,
          connectors: [
            new Web3AuthConnector({
              options: {
                web3AuthInstance: web3AuthInstance,
              },
            }),
          ],
        }),
      );
    };

    init().catch(console.error);
  }, []);

  return (
    <Web3Context.Provider value={{ web3Auth }}>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
    </Web3Context.Provider>
  );
};
