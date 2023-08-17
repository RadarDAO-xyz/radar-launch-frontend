import { CacheKey } from "@/constants/react-query";
import { getEthExchangeRate } from "@/lib/getEthExchangeRate";
import { useQuery } from "wagmi";

export function useGetExchangeRate() {
  return useQuery([CacheKey.EXCHANGE_RATE], () => getEthExchangeRate());
}
