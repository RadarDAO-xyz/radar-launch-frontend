import { CacheKey } from '@/constants/react-query';
import { getPoolProjects } from '@/lib/backend';
import { useQuery } from 'wagmi';

export function useGetPoolProjects(poolId: string) {
  return useQuery(
    [CacheKey.POOL_PROJECTS, poolId],
    () => getPoolProjects(poolId),
    {
      enabled: Boolean(poolId)
    }
  );
}
