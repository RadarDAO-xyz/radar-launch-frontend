import { Button } from '@/components/ui/button';
import { CONTRACT_ADDRESS } from '@/constants/address';
import {
  usePrepareRadarEditionsStopEdition,
  useRadarEditionsStopEdition,
} from '@/lib/generated';
import { usePrivy } from '@privy-io/react-auth';
import type { Address } from 'viem';
import { chains } from '../Providers/Web3Provider';
import { useToast } from '../ui/use-toast';

interface Props {
  isOpen: boolean;
  editionId?: number;
}

export function DisapproveEditionButton({ isOpen, editionId }: Props) {
  const { toast } = useToast();
  const { user } = usePrivy();

  const { config } = usePrepareRadarEditionsStopEdition({
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
  const { writeAsync, isLoading } = useRadarEditionsStopEdition(config);
  return (
    <Button
      disabled={isLoading}
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
      Stop Edition (on-chain)
    </Button>
  );
}
