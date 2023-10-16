import { Button } from '@/components/ui/button';
import { CONTRACT_ADDRESS } from '@/constants/address';
import {
  usePrepareRadarEditionsUpdateEdition,
  useRadarEditionsUpdateEdition,
} from '@/lib/generated';
import { EditionStatus } from '@/types/web3';
import { usePrivyWagmi } from '@privy-io/wagmi-connector';
import type { Address } from 'viem';
import { chains } from '../../lib/wagmi';
import { useToast } from '../ui/use-toast';

interface Props {
  isOpen: boolean;
  editionId?: number;
  projectId: string;
  briefId: string;
  onChainStatus?: EditionStatus;
}

export function UpdateEditionButton({
  isOpen,
  editionId,
  projectId,
  briefId,
  onChainStatus,
}: Props) {
  const { toast } = useToast();
  const { wallet } = usePrivyWagmi();

  const projectCanBeUpdated =
    onChainStatus !== undefined && onChainStatus !== EditionStatus.NOT_CREATED;

  const { config } = usePrepareRadarEditionsUpdateEdition({
    account: wallet?.address as Address,
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled:
      Boolean(chains[0].id) &&
      isOpen &&
      editionId !== undefined &&
      editionId > 0 &&
      wallet?.address !== undefined &&
      projectCanBeUpdated,
    args: [BigInt(editionId || 0), projectId, briefId],
  });
  const { writeAsync, isLoading } = useRadarEditionsUpdateEdition(config);

  console.log({ editionId, projectId, briefId });

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
      disabled={!projectCanBeUpdated}
    >
      {projectCanBeUpdated
        ? 'Sync Brief (on-chain)'
        : 'Edition cannot be synced'}
    </Button>
  );
}
