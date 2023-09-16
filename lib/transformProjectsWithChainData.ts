import { Project } from '@/types/mongo';
import { OnChainProject } from '@/types/web3';

export function transformProjects(
  databaseProjects?: Project[],
  chainProjects?: OnChainProject[],
) {
  if (!databaseProjects || !chainProjects) {
    return [];
  }

  const projectIdToEditionId = chainProjects.reduce<
    Record<string, { index: number; onChainStatus: number }>
  >((acc, project, index) => {
    acc[project.id] = { index, onChainStatus: project.status };
    return acc;
  }, {});

  return databaseProjects.map((project) => ({
    ...project,
    editionId: projectIdToEditionId[project._id]?.index,
    onChainStatus: projectIdToEditionId[project._id]?.onChainStatus,
  }));
}
