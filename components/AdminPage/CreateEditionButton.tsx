import { Button } from '@/components/ui/button';
import { CONTRACT_ADDRESS } from '@/constants/address';
import { useGetExchangeRate } from '@/hooks/useGetExchangeRate';
import {
  usePrepareRadarEditionsCreateEdition,
  useRadarEditionsCreateEdition,
} from '@/lib/generated';
import { convertAddressToChecksum } from '@/lib/utils';
import { usePrivy } from '@privy-io/react-auth';
import { Address, parseEther } from 'viem';
import { chains } from '../../lib/wagmi';
import { useToast } from '../ui/use-toast';

interface Props {
  isOpen: boolean;
  projectId: string;
  fee: number;
  address: string;
  briefId: string;
}

export function CreateEditionButton({
  isOpen,
  projectId,
  fee,
  address,
  briefId,
}: Props) {
  const { toast } = useToast();
  const { user } = usePrivy();
  const { data: exchangeRateData } = useGetExchangeRate();

  const actualFee =
    exchangeRateData?.ethereum?.usd !== undefined
      ? parseEther(String(fee / exchangeRateData.ethereum.usd), 'wei')
      : BigInt(fee);
  const { config } = usePrepareRadarEditionsCreateEdition({
    address: CONTRACT_ADDRESS,
    account: user?.wallet?.address as Address,
    chainId: chains[0].id,
    enabled:
      Boolean(chains[0].id) &&
      isOpen &&
      user?.wallet?.address !== undefined &&
      exchangeRateData?.ethereum?.usd !== undefined,
    args: [
      actualFee,
      convertAddressToChecksum(address)!,
      convertAddressToChecksum(address)!,
      projectId,
      briefId,
    ],
  });
  const { writeAsync, isLoading } = useRadarEditionsCreateEdition(config);

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
      Create Edition (on-chain)
    </Button>
  );
}
