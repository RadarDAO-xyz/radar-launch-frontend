import { Button } from '@/components/ui/button';
import { CONTRACT_ADDRESS } from '@/constants/address';
import {
  usePrepareRadarEditionsApproveEdition,
  useRadarEditionsApproveEdition,
} from '@/lib/generated';
import { chains } from '../Providers/Web3Provider';
import { useToast } from '../ui/use-toast';
import { useAccount } from 'wagmi';

interface Props {
  isOpen: boolean;
  editionId?: number;
}
export function ApproveEditionButton({ isOpen, editionId }: Props) {
  const { toast } = useToast();
  const { address } = useAccount();
  const { config } = usePrepareRadarEditionsApproveEdition({
    account: address,
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled:
      Boolean(chains[0].id) &&
      isOpen &&
      editionId !== undefined &&
      address !== undefined,
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
