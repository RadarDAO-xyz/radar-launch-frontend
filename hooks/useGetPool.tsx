import { getPool } from "@/lib/backend";
import { useQuery } from "wagmi";

export function useGetPool(id?: string) {
  return useQuery(["pool", id], () => getPool(id!), {
    enabled: Boolean(id),
  });
}
