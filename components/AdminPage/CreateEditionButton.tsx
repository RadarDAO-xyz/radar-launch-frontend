import { Button } from '@/components/ui/button';
import { CONTRACT_ADDRESS } from '@/constants/address';
import { useGetExchangeRate } from '@/hooks/useGetExchangeRate';
import {
  usePrepareRadarEditionsCreateEdition,
  useRadarEditionsCreateEdition,
} from '@/lib/generated';
import { convertAddressToChecksum } from '@/lib/utils';
import { EditionStatus } from '@/types/web3';
import { usePrivyWagmi } from '@privy-io/wagmi-connector';
import { Address, parseEther } from 'viem';
import { chains } from '../../lib/wagmi';
import { useToast } from '../ui/use-toast';

interface Props {
  isOpen: boolean;
  projectId: string;
  fee: number;
  address: string;
  briefId: string;
  onChainStatus?: EditionStatus;
}

export function CreateEditionButton({
  isOpen,
  projectId,
  fee,
  address,
  briefId,
  onChainStatus,
}: Props) {
  const { toast } = useToast();
  const { wallet } = usePrivyWagmi();
  const { data: exchangeRateData } = useGetExchangeRate();

  const actualFee =
    exchangeRateData?.ethereum?.usd !== undefined
      ? parseEther(String(fee / exchangeRateData.ethereum.usd), 'wei')
      : BigInt(fee);
  const { config } = usePrepareRadarEditionsCreateEdition({
    address: CONTRACT_ADDRESS,
    account: wallet?.address as Address,
    chainId: chains[0].id,
    enabled:
      Boolean(chains[0].id) &&
      isOpen &&
      wallet?.address !== undefined &&
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

  const projectAlreadyOnChain =
    onChainStatus !== undefined && onChainStatus !== EditionStatus.NOT_CREATED;

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
      disabled={projectAlreadyOnChain}
    >
      {projectAlreadyOnChain
        ? 'Project already on chain'
        : 'Create Edition (on-chain)'}
    </Button>
  );
}
