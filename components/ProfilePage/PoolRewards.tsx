import { CONTRACT_ADDRESS } from '@/constants/address';
import {
  usePrepareRadarEditionsRetrieveBalance,
  useRadarEditionsRetrieveBalance,
} from '@/lib/generated';
import { chains } from '@/lib/wagmi';
import { ProjectWithChainData } from '@/types/web3';
import { usePrivyWagmi } from '@privy-io/wagmi-connector';
import { useEffect, useState } from 'react';
import { useWaitForTransaction } from 'wagmi';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { RewardsContainer } from './RewardsContainer';
import Link from 'next/link';
import { formatEther } from '@/lib/utils';

interface Props {
  projects: ProjectWithChainData[];
  amount: bigint;
}

export function PoolRewards({ amount, projects }: Props) {
  const { wallet } = usePrivyWagmi();
  const { config } = usePrepareRadarEditionsRetrieveBalance({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    args: [amount],
    enabled: Boolean(wallet?.address) && amount > 0n,
  });
  const { data, writeAsync, isLoading } =
    useRadarEditionsRetrieveBalance(config);
  const { toast } = useToast();
  const [hasToasted, setHasToasted] = useState(false);

  const { isLoading: txIsLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    enabled: data?.hash !== undefined,
  });

  useEffect(() => {
    if (txIsLoading && data?.hash) {
      toast({
        title: 'Transaction sent!',
        description: 'Awaiting for confirmation...',
      });
    }
  }, [txIsLoading, data?.hash]);

  useEffect(() => {
    if (isSuccess && data?.hash && !hasToasted) {
      toast({
        title: 'Success!',
        description: 'Your rewards have been withdrawn!',
      });
      setHasToasted(true);
    }
  }, [isSuccess, data?.hash]);

  return (
    <RewardsContainer
      projects={projects.map((project) => (
        <div key={project._id} className="py-2">
          <Link href={`/project/${project._id}`} className="hover:underline">
            {project.title}
          </Link>
        </div>
      ))}
      title={'POOL REWARDS'}
      amount={<span>{formatEther(amount).toString().slice(0, 9)} ETH</span>}
      button={
        <Button
          loading={isLoading}
          disabled={writeAsync === undefined}
          onClick={() => {
            writeAsync?.();
          }}
        >
          Withdraw Pool Rewards
        </Button>
      }
    />
  );
}
