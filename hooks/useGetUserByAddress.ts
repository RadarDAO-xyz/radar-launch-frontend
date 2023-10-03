import { CacheKey } from '@/constants/react-query';
import { getUserByAddress } from '@/lib/backend';
import { useQuery } from 'wagmi';

export function useGetUserByAddress(address?: string) {
  return useQuery(
    [CacheKey.USER_BY_ADDRESS, address],
    () => getUserByAddress(address!),
    {
      enabled: Boolean(address),
    },
  );
}
