import { getExchangeRate } from "@/lib/backend";
import { useQuery } from "wagmi";

export function useGetExchangeRate(symbols: string) {
  return useQuery(["exchangeRate", symbols], () => getExchangeRate(symbols), {
    enabled: Boolean(symbols),
  });
}
