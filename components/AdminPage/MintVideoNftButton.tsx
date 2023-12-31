import { VIDEO_CONTRACT_ADDRESS } from '@/constants/address';
import {
  usePrepareRadarVideoNftMint,
  useRadarVideoNftMint,
} from '@/lib/generated';
import { usePrivyWagmi } from '@privy-io/wagmi-connector';
import { useEffect } from 'react';
import type { Address } from 'viem';
import { chains } from '../../lib/wagmi';
import { Button } from '../ui/button';
import { useAsset } from '@livepeer/react';

interface Props {
  videoId?: string;
}

export function MintVideoNftButton({ videoId }: Props) {
  const { wallet } = usePrivyWagmi();
  const { data: asset } = useAsset({ assetId: videoId });
  const { config } = usePrepareRadarVideoNftMint({
    account: wallet?.address as Address,
    address: VIDEO_CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled:
      Boolean(chains[0].id) &&
      videoId !== undefined &&
      wallet?.address !== undefined &&
      asset?.storage?.ipfs?.nftMetadata?.url !== undefined,
    args: [wallet?.address as Address, asset?.storage?.ipfs?.nftMetadata?.url!],
  });
  const { data, write, error, isLoading } = useRadarVideoNftMint(config);

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
      loading={isLoading}
      disabled={write === undefined || videoId === undefined}
    >
      Mint Video
    </Button>
  );
}
