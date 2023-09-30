import { Button } from '@/components/ui/button';
import { CONTRACT_ADDRESS } from '@/constants/address';
import {
  usePrepareRadarEditionsStopEdition,
  useRadarEditionsStopEdition,
} from '@/lib/generated';
import { usePrivyWagmi } from '@privy-io/wagmi-connector';
import type { Address } from 'viem';
import { chains } from '../../lib/wagmi';
import { useToast } from '../ui/use-toast';
import { EditionStatus } from '@/types/web3';

interface Props {
  isOpen: boolean;
  editionId?: number;
  onChainStatus?: EditionStatus;
}

export function StopEditionButton({ isOpen, editionId, onChainStatus }: Props) {
  const { toast } = useToast();
  const { wallet } = usePrivyWagmi();
  const { config } = usePrepareRadarEditionsStopEdition({
    account: wallet?.address as Address,
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled:
      Boolean(chains[0].id) &&
      isOpen &&
      editionId !== undefined &&
      wallet?.address !== undefined,
    args: [BigInt(+(editionId || 0)) || 0n],
  });
  const { writeAsync, isLoading } = useRadarEditionsStopEdition(config);

  const projectCanBeStopped =
    onChainStatus !== undefined && onChainStatus === EditionStatus.LAUNCHED;

  return (
    <Button
      loading={isLoading}
      onClick={() => {
        try {
          writeAsync?.();
        } catch (e) {
          console.error(e);
          toast({
            variant: 'destructive',
            title: 'An unexpected error occured',
            description: 'Check the console for more information',
          });
        }
      }}
      disabled={!projectCanBeStopped}
    >
      {projectCanBeStopped
        ? 'Stop Edition (on-chain)'
        : 'Edition already / cannot be stopped'}
    </Button>
  );
}
