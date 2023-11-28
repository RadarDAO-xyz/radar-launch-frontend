import { CacheKey } from '@/constants/react-query';
import { fetchBelieveEvents } from '@/lib/graphql';
import { useQuery } from 'wagmi';

export function useGetBelieveEvents(editionId?: number, isDisabled?: boolean) {
  return useQuery(
    [CacheKey.BELIEVER_LOGS, editionId],
    () => fetchBelieveEvents(editionId!),
    {
      enabled: editionId !== undefined && editionId >= 0 && !isDisabled,
    },
  );
}
