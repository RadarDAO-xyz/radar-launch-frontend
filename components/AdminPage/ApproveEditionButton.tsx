import { Button } from '@/components/ui/button';
import { CONTRACT_ADDRESS } from '@/constants/address';
import {
  usePrepareRadarEditionsApproveEdition,
  useRadarEditionsApproveEdition,
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

export function ApproveEditionButton({
  isOpen,
  editionId,
  onChainStatus,
}: Props) {
  const { toast } = useToast();
  const { wallet } = usePrivyWagmi();

  const projectCanBeApproved =
    onChainStatus !== undefined && onChainStatus === EditionStatus.CREATED;

  const { config } = usePrepareRadarEditionsApproveEdition({
    account: wallet?.address as Address,
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled:
      Boolean(chains[0].id) &&
      isOpen &&
      editionId !== undefined &&
      editionId >= 0 &&
      wallet?.address !== undefined &&
      projectCanBeApproved,
    args: [BigInt(editionId || 0)],
  });
  const { writeAsync, isLoading: isApproveLoading } =
    useRadarEditionsApproveEdition(config);

  return (
    <Button
      loading={isApproveLoading}
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
      disabled={!projectCanBeApproved}
    >
      {projectCanBeApproved
        ? 'Approve Edition (on-chain)'
        : 'Project already / cannot be approved'}
    </Button>
  );
}
