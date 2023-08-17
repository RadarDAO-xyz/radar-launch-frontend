import { CacheKey } from "@/constants/react-query";
import { getPool } from "@/lib/backend";
import { useQuery } from "wagmi";

export function useGetPool(id?: string) {
  return useQuery([CacheKey.POOL, id], () => getPool(id!), {
    enabled: Boolean(id),
  });
}
