import { CacheKey } from "@/constants/react-query";
import { getTotalContributions } from "@/lib/backend";
import { useQuery } from "wagmi";

export function useGetTotalContributions() {
  return useQuery([CacheKey.TOTAL_CONTRIBUTION], () => getTotalContributions());
}
