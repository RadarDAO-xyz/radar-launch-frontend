import { formatEther } from '@/lib/utils';
import { ProjectWithChainData } from '@/types/web3';
import { RewardsContainer } from './RewardsContainer';
import { Button } from '../ui/button';

interface Props {
  projects: ProjectWithChainData[];
}

export function BuilderRewards({ projects }: Props) {
  return (
    <RewardsContainer
      projects={projects.map((project) => (
        <div key={project._id} className="py-2">
          {project.title}: {formatEther(project.balance ?? 0n).slice(0, 9)} ETH
        </div>
      ))}
      title={'BUILDER REWARDS'}
      amount={
        <span>
          {projects
            .map((project) => project.balance || 0n)
            .reduce((acc, balance) => acc + balance, 0n)
            .toString()
            .slice(0, 9)}{' '}
          ETH
        </span>
      }
      button={<Button>Withdraw Builder Rewards</Button>}
    />
  );
}
