import { Button } from '@/components/ui/button';
import { CONTRACT_ADDRESS } from '@/constants/address';
import {
  usePrepareRadarEditionsResumeEdition,
  useRadarEditionsResumeEdition,
} from '@/lib/generated';
import { EditionStatus } from '@/types/web3';
import { usePrivyWagmi } from '@privy-io/wagmi-connector';
import type { Address } from 'viem';
import { chains } from '../../lib/wagmi';
import { useToast } from '../ui/use-toast';

interface Props {
  isOpen: boolean;
  editionId?: number;
  onChainStatus?: EditionStatus;
}

export function ResumeEditionButton({
  isOpen,
  editionId,
  onChainStatus,
}: Props) {
  const { toast } = useToast();
  const { wallet } = usePrivyWagmi();

  const projectCanBeResumed =
    onChainStatus !== undefined && onChainStatus === EditionStatus.STOPPED;

  const { config } = usePrepareRadarEditionsResumeEdition({
    account: wallet?.address as Address,
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled:
      Boolean(chains[0].id) &&
      isOpen &&
      editionId !== undefined &&
      wallet?.address !== undefined &&
      projectCanBeResumed,
    args: [BigInt(+(editionId || 0)) || 0n],
  });
  const { writeAsync, isLoading } = useRadarEditionsResumeEdition(config);

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
      disabled={!projectCanBeResumed}
    >
      {projectCanBeResumed
        ? 'Resume Edition (on-chain)'
        : 'Edition already / cannot be resumed'}
    </Button>
  );
}
