import cache from "memory-cache";

export interface ExchangeRate {
  ethereum: { usd?: number };
}

const cacheInstance = new cache.Cache();

export async function getEthExchangeRate(): Promise<ExchangeRate> {
  try {
    if (cacheInstance.get("exchange-rate") !== null) {
      console.log("cache hit", cacheInstance.get("exchange-rate"));
      return cacheInstance.get("exchange-rate") as ExchangeRate;
    }
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
    );
    if (!response.ok) {
      console.error(response);
      throw new Error("Error fetching exchange rate");
    }
    const data = await response.json();
    console.log("cache miss", data);
    cacheInstance.put("exchange-rate", data, 1000 * 60 * 60 * 24);
    return data;
  } catch (e) {
    console.error(e);
  }
  return { ethereum: { usd: undefined } };
}
