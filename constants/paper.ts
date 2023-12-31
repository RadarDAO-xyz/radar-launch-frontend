import isTestnet from '@/lib/isTestnet';

export const GOERLI_CONTRACT_ID = '4640edad-5cf1-4024-8de8-955f620894f1';
export const MAINNET_CONTRACT_ID = '06094e66-a683-4e2b-ac5c-9d09933ea1d4';

export const PAPER_CONTRACT_ID = isTestnet()
  ? GOERLI_CONTRACT_ID
  : MAINNET_CONTRACT_ID;
