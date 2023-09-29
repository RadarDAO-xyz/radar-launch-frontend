import { VIDEO_CONTRACT_ADDRESS } from '@/constants/address';
import {
  usePrepareRadarVideoNftMint,
  useRadarVideoNftMint,
} from '@/lib/generated';
import { usePrivy } from '@privy-io/react-auth';
import { useEffect } from 'react';
import type { Address } from 'viem';
import { chains } from '../../lib/wagmi';
import { Button } from '../ui/button';

export function MintVideoNftButton({ videoId }: { videoId?: string }) {
  const { user } = usePrivy();
  const { config } = usePrepareRadarVideoNftMint({
    account: user?.wallet?.address as Address,
    address: VIDEO_CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled:
      Boolean(chains[0].id) &&
      videoId !== undefined &&
      user?.wallet?.address !== undefined,
    args: [user?.wallet?.address as Address, videoId!],
  });
  const { data, write, error } = useRadarVideoNftMint(config);

  useEffect(() => {
    if (data || error) {
      console.log('mint video', data, error);
    }
  }, [data, error]);

  return (
    <Button
      onClick={() => {
        write?.();
      }}
      disabled={write === undefined || videoId === undefined}
    >
      Mint Video
    </Button>
  );
}
