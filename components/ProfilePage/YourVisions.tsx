import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { ProjectWithChainData } from '@/pages/profile/[id]';
import { ProjectStatus } from '@/types/mongo';
import { VisionCard } from './VisionCard';
import { ProjectBlock } from '../Layout/ProjectBlock';

interface Props {
  projects: ProjectWithChainData[];
}

export function YourVisions({ projects }: Props) {
  const { data: currentUserData } = useGetCurrentUser();
  return (
    <div>
      <div className="mb-6 rounded-lg border p-8">
        <h2 className="text-xl">ACTIVE VISIONS</h2>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
          {projects
            .filter(
              (project) =>
                project.status !== ProjectStatus.CANCELLED &&
                project.status !== ProjectStatus.REJECTED,
            )
            .map((project) => {
              if (
                project.admin_address.toUpperCase() ===
                currentUserData?.wallets?.[0].address?.toUpperCase()
              ) {
                return <VisionCard key={project._id} {...project} />;
              }
              return (
                <ProjectBlock
                  {...project}
                  key={project._id}
                  showDropDate
                  showMintEndDate
                  showSupporters
                />
              );
            })}
        </div>
      </div>
      <div className="rounded-lg border p-8">
        <h2 className="text-xl">INACTIVE VISIONS</h2>
        <div className="grid grid-cols-4 gap-2">
          {projects
            .filter((project) => project.status === ProjectStatus.REJECTED)
            .map((project) => {
              if (
                project.admin_address.toUpperCase() ===
                currentUserData?.wallets?.[0].address?.toUpperCase()
              ) {
                return <VisionCard key={project._id} {...project} />;
              }
              return (
                <ProjectBlock
                  {...project}
                  key={project._id}
                  showDropDate
                  showMintEndDate
                  showSupporters
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
