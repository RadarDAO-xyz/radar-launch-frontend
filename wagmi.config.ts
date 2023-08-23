import RadarEditions from '@/abi/RadarEditions.sol/RadarEditions.json';
import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import type { Abi } from 'viem';

export default defineConfig({
  out: 'lib/generated.ts',
  contracts: [{ name: 'RadarEditions', abi: RadarEditions.abi as Abi }],
  plugins: [react()]
});
