import { getTotalContributions } from "@/lib/backend";
import { useQuery } from "wagmi";

export function useGetTotalContributions() {
  return useQuery(["total-contribution"], () => getTotalContributions());
}
