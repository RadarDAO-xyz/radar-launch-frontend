import { CacheKey } from '@/constants/react-query';
import { getProjectSupporters } from '@/lib/backend';
import { useQuery } from 'wagmi';

export function useGetProjectSupporters(
  projectId: string,
  idToken: string,
  signups: boolean,
  contributors: boolean
) {
  return useQuery(
    [CacheKey.PROJECT_SUPPORTERS, projectId, idToken, signups, contributors],
    () => getProjectSupporters(projectId, idToken, signups, contributors),
    {
      enabled: (signups || contributors) && idToken !== ''
    }
  );
}
