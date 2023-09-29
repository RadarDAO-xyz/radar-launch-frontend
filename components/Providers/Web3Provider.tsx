import isTestnet from '@/lib/isTestnet';
import { WALLET_ADAPTERS, CHAIN_NAMESPACES } from '@web3auth/base';
import { Web3Auth, Web3AuthOptions } from '@web3auth/modal';
// import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
import { useTheme } from 'next-themes';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { optimism, optimismGoerli } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

export const configureChainsConfig = configureChains(
  [isTestnet() ? optimismGoerli : optimism],
  [publicProvider(), infuraProvider({ apiKey: process.env.VITE_INFURA_KEY! })],
);

export const { chains, publicClient, webSocketPublicClient } =
  configureChainsConfig;

// const openloginAdapter = new OpenloginAdapter({
//   adapterSettings: {
//     uxMode: 'popup',
//     whiteLabel: {
//       name: 'RADAR Launch',
//       url: 'https://radarlaunch.app',
//       logoLight: 'https://radarlaunch.app/project-image.png',
//       logoDark: 'https://radarlaunch.app/project-image.png',
//       defaultLanguage: 'en', // en, de, ja, ko, zh, es, fr, pt, nl
//       dark: false, // whether to enable dark mode. defaultValue: false
//       theme: {
//         primary: '#00B4FF',
//       },
//     },
//     network: isTestnet() ? 'testnet' : 'cyan',
//   },
// });

const chainConfig: Web3AuthOptions['chainConfig'] = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  rpcTarget: chains[0].rpcUrls.default.http[0],
  chainId: '0x' + chains[0].id.toString(16),
  displayName: chains[0].name,
  tickerName: chains[0].nativeCurrency?.name,
  ticker: chains[0].nativeCurrency?.symbol,
  blockExplorer: chains[0]?.blockExplorers.default?.url,
};

// const metamaskAdapter = new MetamaskAdapter({
//   clientId: process.env.VITE_WEB3AUTH_CLIENT_ID!,
//   sessionTime: 86400,
//   chainConfig,
//   web3AuthNetwork: isTestnet() ? 'testnet' : 'cyan',
// });

interface Web3ContextType {
  web3Auth?: Web3Auth;
}

export const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children?: ReactNode }) => {
  const { theme } = useTheme();
  const [web3Auth, setWeb3Auth] = useState<Web3Auth>();
  const [wagmiConfig, setWagmiConfig] =
    useState<ReturnType<typeof createConfig>>();

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
          theme: theme === 'light' ? 'light' : 'dark',
        },
      });

      // web3AuthInstance.configureAdapter(openloginAdapter);
      // web3AuthInstance.configureAdapter(metamaskAdapter);
      // web3AuthInstance.configureAdapter(walletConnectV2Adapter);

      setWeb3Auth(web3AuthInstance);

      await web3AuthInstance.initModal({
        modalConfig: {
          [WALLET_ADAPTERS.TORUS_EVM]: {
            label: 'TORUS_EVM',
            showOnModal: false,
          },
          [WALLET_ADAPTERS.OPENLOGIN]: {
            label: 'openlogin',
            loginMethods: {
              google: {
                name: '',
                showOnModal: false,
              },
              facebook: {
                name: '',
                showOnModal: false,
              },
              reddit: {
                name: '',
                showOnModal: false,
              },
              discord: {
                name: '',
                showOnModal: false,
              },
              twitch: {
                name: '',
                showOnModal: false,
              },
              apple: {
                name: '',
                showOnModal: false,
              },
              line: {
                name: '',
                showOnModal: false,
              },
              github: {
                name: '',
                showOnModal: false,
              },
              kakao: {
                name: '',
                showOnModal: false,
              },
              linkedin: {
                name: '',
                showOnModal: false,
              },
              twitter: {
                name: '',
                showOnModal: false,
              },
              weibo: {
                name: '',
                showOnModal: false,
              },
              wechat: {
                name: '',
                showOnModal: false,
              },
              sms_passwordless: {
                name: '',
                showOnModal: false,
              },
              jwt: {
                name: '',
                showOnModal: false,
              },
            },
          },
        },
      });
      setWagmiConfig(
        createConfig({
          autoConnect: false,
          publicClient,
          webSocketPublicClient,
          connectors: [
            new Web3AuthConnector({
              options: {
                web3AuthInstance,
              },
            }),
          ],
        }) as any,
      );
    };

    init().catch(console.error);
  }, []);

  if (!wagmiConfig) {
    return null;
  }

  return (
    <Web3Context.Provider value={{ web3Auth }}>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
    </Web3Context.Provider>
  );
};
