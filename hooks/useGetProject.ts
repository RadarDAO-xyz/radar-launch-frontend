import { CacheKey } from '@/constants/react-query';
import { getProject } from '@/lib/backend';
import type { Project } from '@/types/mongo';
import { useQuery } from 'wagmi';

export function useGetProject(id?: string, initialData?: Project) {
  return useQuery([CacheKey.PROJECT, id], () => getProject(id!), {
    enabled: Boolean(id),
    initialData,
    staleTime: 1000
  });
}
