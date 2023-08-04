import { useAccount, useQuery } from "wagmi";

async function fetchExchangeRate(symbols: string) {
  return fetch(`/api/exchange-rate?symbols=${symbols}`).then((res) =>
    res.json()
  );
}

export function useGetExchangeRate(symbols: string) {
  return useQuery(["exchangeRate", symbols], () => fetchExchangeRate(symbols), {
    enabled: Boolean(symbols),
  });
}
