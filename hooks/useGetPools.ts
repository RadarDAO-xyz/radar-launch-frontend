import { CacheKey } from '@/constants/react-query';
import { getPools } from '@/lib/backend';
import { useQuery } from 'wagmi';

export function useGetPools() {
  return useQuery([CacheKey.POOLS], getPools);
}
