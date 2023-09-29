import isTestnet from '@/lib/isTestnet';
import { configureChains } from 'wagmi';
import { optimism, optimismGoerli } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

export const configureChainsConfig = configureChains(
  [isTestnet() ? optimismGoerli : optimism],
  [publicProvider(), infuraProvider({ apiKey: process.env.VITE_INFURA_KEY! })],
);

export const { chains, publicClient, webSocketPublicClient } =
  configureChainsConfig;
