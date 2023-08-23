import { CacheKey } from '@/constants/react-query';
import { getUser } from '@/lib/backend';
import { useQuery } from 'wagmi';

export function useGetUser(userId?: string) {
  return useQuery([CacheKey.USER, userId], () => getUser(userId!), {
    enabled: Boolean(userId)
  });
}
