import { CacheKey } from '@/constants/react-query';
import { getCurrentUser } from '@/lib/backend';
import { usePrivyWagmi } from '@privy-io/wagmi-connector';
import { useQuery } from 'wagmi';
import { useAuth } from './useAuth';

export function useGetCurrentUser() {
  const { wallet } = usePrivyWagmi();
  const { idToken } = useAuth();

  return useQuery(
    [CacheKey.CURRENT_USER, idToken, wallet?.address],
    () => getCurrentUser(idToken),
    {
      enabled: idToken !== '',
    },
  );
}
