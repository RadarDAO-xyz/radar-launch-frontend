import { getEthExchangeRate } from "@/lib/getEthExchangeRate";
import { useQuery } from "wagmi";

export function useGetExchangeRate() {
  return useQuery(["exchange-rate"], () => getEthExchangeRate());
}
