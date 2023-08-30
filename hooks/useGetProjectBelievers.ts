import { CacheKey } from '@/constants/react-query';
import { getProjectBelievers } from '@/lib/backend';
import { useQuery } from 'wagmi';

export function useGetProjectBelievers(projectId: string) {
  return useQuery(
    [CacheKey.PROJECT_BELIEVERS, projectId],
    () => getProjectBelievers(projectId),
    {
      enabled: projectId.length > 0,
    },
  );
}
