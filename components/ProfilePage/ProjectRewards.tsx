import { CONTRACT_ADDRESS } from '@/constants/address';
import {
  usePrepareRadarEditionsWithdrawFromAllEditionBalance,
  useRadarEditionsWithdrawFromAllEditionBalance,
} from '@/lib/generated';
import { formatEther } from '@/lib/utils';
import { chains } from '@/lib/wagmi';
import { ProjectWithChainData } from '@/types/web3';
import { usePrivyWagmi } from '@privy-io/wagmi-connector';
import { useEffect, useState } from 'react';
import { useWaitForTransaction } from 'wagmi';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { RewardsContainer } from './RewardsContainer';
import Link from 'next/link';

interface Props {
  projects: ProjectWithChainData[];
}

export function ProjectRewards({ projects }: Props) {
  const { wallet } = usePrivyWagmi();
  const { config } = usePrepareRadarEditionsWithdrawFromAllEditionBalance({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled: Boolean(wallet?.address),
  });
  const { data, writeAsync, isLoading } =
    useRadarEditionsWithdrawFromAllEditionBalance(config);
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
            {project.title}: {formatEther(project.balance ?? 0n).slice(0, 9)}{' '}
            ETH
          </Link>
        </div>
      ))}
      title={'PROJECT REWARDS'}
      amount={
        <span>
          {formatEther(
            projects
              .map((project) => project.balance || 0n)
              .reduce((acc, balance) => acc + balance, 0n),
          )
            .toString()
            .slice(0, 9)}{' '}
          ETH
        </span>
      }
      button={
        <Button
          loading={isLoading}
          disabled={writeAsync === undefined}
          onClick={() => {
            writeAsync?.();
          }}
        >
          Withdraw Project Rewards
        </Button>
      }
    />
  );
}
