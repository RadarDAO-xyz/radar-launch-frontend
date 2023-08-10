import { getPoolProjects } from "@/lib/backend";
import { useQuery } from "wagmi";

export function useGetPoolProjects(poolId: string) {
  return useQuery(["pool-projects", poolId], () => getPoolProjects(poolId), {
    enabled: Boolean(poolId),
  });
}
