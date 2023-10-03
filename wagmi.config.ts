import RadarEditions from '@/abi/RadarEditions.sol/RadarEditions.json';
import RadarVideoNFT from '@/abi/RadarVideoNFT.sol/RadarVideoNFT.json';
import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import type { Abi } from 'viem';

export default defineConfig({
  out: 'lib/generated.ts',
  contracts: [
    { name: 'RadarEditions', abi: RadarEditions.abi as Abi },
    { name: 'RadarVideoNFT', abi: RadarVideoNFT.abi as Abi },
  ],
  plugins: [react()],
});
