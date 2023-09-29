import { Button } from '@/components/ui/button';
import { CONTRACT_ADDRESS } from '@/constants/address';
import {
  usePrepareRadarEditionsApproveEdition,
  useRadarEditionsApproveEdition,
} from '@/lib/generated';
import { usePrivy } from '@privy-io/react-auth';
import type { Address } from 'viem';
import { chains } from '../../lib/wagmi';
import { useToast } from '../ui/use-toast';

interface Props {
  isOpen: boolean;
  editionId?: number;
}
export function ApproveEditionButton({ isOpen, editionId }: Props) {
  const { toast } = useToast();
  const { user } = usePrivy();
  const { config } = usePrepareRadarEditionsApproveEdition({
    account: user?.wallet?.address as Address,
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled:
      Boolean(chains[0].id) &&
      isOpen &&
      editionId !== undefined &&
      user?.wallet?.address !== undefined,
    args: [BigInt(+(editionId || 0)) || 0n],
  });
  const { writeAsync, isLoading: isApproveLoading } =
    useRadarEditionsApproveEdition(config);

  return (
    <Button
      disabled={isApproveLoading}
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
    >
      Approve Edition (on-chain)
    </Button>
  );
}
