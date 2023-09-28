import {
  usePrepareRadarVideoNftMint,
  useRadarVideoNftMint,
} from '@/lib/generated';
import { Button } from '../ui/button';
import { VIDEO_CONTRACT_ADDRESS } from '@/constants/address';
import { chains } from '../Providers/Web3Provider';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';

export function MintVideoNftButton({ videoId }: { videoId?: string }) {
  const { address } = useAccount();
  const { config } = usePrepareRadarVideoNftMint({
    account: address,
    address: VIDEO_CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled:
      Boolean(chains[0].id) && videoId !== undefined && address !== undefined,
    args: [address!, videoId!],
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
