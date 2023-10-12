import { VIDEO_CONTRACT_ADDRESS } from '@/constants/address';
import {
  usePrepareRadarVideoNftSetTokenUri,
  useRadarVideoNftSetTokenUri,
} from '@/lib/generated';
import { usePrivyWagmi } from '@privy-io/wagmi-connector';
import { useEffect } from 'react';
import type { Address } from 'viem';
import { chains } from '../../lib/wagmi';
import { Button } from '../ui/button';

interface Props {
  videoId?: number;
  tokenUri?: string;
}

export function UpdateVideoNftButton({ videoId, tokenUri }: Props) {
  const { wallet } = usePrivyWagmi();
  const { config } = usePrepareRadarVideoNftSetTokenUri({
    account: wallet?.address as Address,
    address: VIDEO_CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled:
      wallet?.address !== undefined &&
      tokenUri !== undefined &&
      videoId !== undefined,
    args: [BigInt(videoId || 0), tokenUri!],
  });
  const { data, write, error, isLoading } = useRadarVideoNftSetTokenUri(config);

  useEffect(() => {
    if (data || error) {
      console.log('update video token uri', data, error);
    }
  }, [data, error]);

  return (
    <Button
      onClick={() => {
        write?.();
      }}
      loading={isLoading}
      disabled={write === undefined || videoId === undefined}
    >
      Update Video tokenURI
    </Button>
  );
}
