import { getPools } from "@/lib/backend";
import { useQuery } from "wagmi";

export function useGetPools() {
  return useQuery(["pools"], getPools);
}
