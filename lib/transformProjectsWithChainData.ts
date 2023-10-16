import { Project } from '@/types/mongo';
import { OnChainProject, ProjectWithChainData } from '@/types/web3';

export function transformProjectsWithChainData(
  databaseProjects?: Project[],
  chainProjects?: readonly OnChainProject[],
): ProjectWithChainData[] {
  if (!databaseProjects || !chainProjects) {
    return [];
  }

  const projectIdToEditionId = chainProjects.reduce<
    Record<
      string,
      { index: number; onChainStatus: number; onChainBriefId: string }
    >
  >((acc, project, index) => {
    acc[project.id] = {
      index,
      onChainStatus: project.status,
      onChainBriefId: project.briefId,
    };
    return acc;
  }, {});

  return databaseProjects.map((project) => ({
    ...project,
    editionId: projectIdToEditionId[project._id]?.index,
    onChainStatus: projectIdToEditionId[project._id]?.onChainStatus,
    onChainBriefId: projectIdToEditionId[project._id]?.onChainBriefId,
  }));
}
