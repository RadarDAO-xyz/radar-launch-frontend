import { Button } from '@/components/ui/button';
import { CONTRACT_ADDRESS } from '@/constants/address';
import {
  usePrepareRadarEditionsApproveEdition,
  usePrepareRadarEditionsCreateEdition,
  useRadarEditionsApproveEdition,
  useRadarEditionsCreateEdition,
} from '@/lib/generated';
import { chains } from '../Providers/Web3Provider';
import { useToast } from '../ui/use-toast';
import { useGetExchangeRate } from '@/hooks/useGetExchangeRate';
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';
import { convertAddressToChecksum } from '@/lib/utils';

interface Props {
  isOpen: boolean;
  projectId: string;
  fee: number;
  address: string;
}
export function CreateEditionButton({
  isOpen,
  projectId,
  fee,
  address,
}: Props) {
  const { toast } = useToast();
  const { address: payerAddress } = useAccount();
  const { data: exchangeRateData } = useGetExchangeRate();

  const actualFee =
    exchangeRateData?.ethereum?.usd !== undefined
      ? parseEther(String(fee / exchangeRateData.ethereum.usd), 'wei')
      : BigInt(fee);
  const { config } = usePrepareRadarEditionsCreateEdition({
    address: CONTRACT_ADDRESS,
    account: payerAddress,
    chainId: chains[0].id,
    enabled:
      Boolean(chains[0].id) &&
      isOpen &&
      payerAddress !== undefined &&
      exchangeRateData?.ethereum?.usd !== undefined,
    args: [
      actualFee,
      convertAddressToChecksum(address)!,
      convertAddressToChecksum(address)!,
      projectId,
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
