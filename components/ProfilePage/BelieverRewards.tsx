import { ProjectWithChainData } from '@/types/web3';
import { RewardsContainer } from './RewardsContainer';
import { Button } from '../ui/button';

interface Props {
  projects: ProjectWithChainData[];
  amount: bigint;
}

export function BelieverRewards({ amount, projects }: Props) {
  return (
    <RewardsContainer
      projects={projects.map((project) => (
        <div key={project._id} className="py-2">
          {project.title}
        </div>
      ))}
      title={'BELIEVER REWARDS'}
      amount={<span>{amount.toString().slice(0, 9)} ETH</span>}
      button={<Button>Withdraw Believer Rewards</Button>}
    />
  );
}
