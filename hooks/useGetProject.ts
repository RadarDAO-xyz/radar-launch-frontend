import { CacheKey } from "@/constants/react-query";
import { getProject } from "@/lib/backend";
import { useQuery } from "wagmi";

export function useGetProject(id?: string) {
  return useQuery([CacheKey.PROJECT, id], () => getProject(id!), {
    enabled: Boolean(id),
  });
}
