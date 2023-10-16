import { CacheKey } from '@/constants/react-query';
import { getUser } from '@/lib/backend';
import type { User } from '@/types/mongo';
import { useQuery } from 'wagmi';

export function useGetUser(userId?: string, initialData?: User) {
  return useQuery([CacheKey.USER, userId], () => getUser(userId!), {
    enabled: Boolean(userId),
    initialData,
    staleTime: 1000,
  });
}
