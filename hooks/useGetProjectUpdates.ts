import { CacheKey } from "@/constants/react-query";
import { getProjectUpdates } from "@/lib/backend";
import { useQuery } from "wagmi";
import { useAuth } from "./useAuth";

export function useGetProjectUpdates(projectId?: string) {
  const { idToken } = useAuth();

  return useQuery(
    [CacheKey.PROJECT_UPDATES, projectId],
    () => getProjectUpdates(idToken, projectId!),
    {
      enabled: Boolean(projectId) && Boolean(idToken),
    }
  );
}
