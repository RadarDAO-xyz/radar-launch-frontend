import { CacheKey } from "@/constants/react-query";
import { getUserProjects } from "@/lib/backend";
import { useQuery } from "wagmi";
import { useAuth } from "./useAuth";

export function useGetUserProjects(userId?: string) {
  const { idToken } = useAuth();

  return useQuery(
    [CacheKey.USER_PROJECTS, userId],
    () => getUserProjects(idToken!, userId!),
    {
      enabled: Boolean(userId) && Boolean(idToken),
    }
  );
}
