import { CacheKey } from '@/constants/react-query';
import { getProjects } from '@/lib/backend';
import { useQuery } from 'wagmi';

export function useGetProjects() {
  return useQuery([CacheKey.PROJECTS], getProjects);
}
