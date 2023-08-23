import cache from 'memory-cache';

export interface ExchangeRate {
  ethereum: { usd?: number };
}

export async function getEthExchangeRate(): Promise<ExchangeRate> {
  try {
    if (cache.get('exchange-rate') !== null) {
      console.log('cache hit', cache.get('exchange-rate'));
      return cache.get('exchange-rate') as ExchangeRate;
    }
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`,
    );
    if (!response.ok) {
      console.error(response);
      throw new Error('Error fetching exchange rate');
    }
    const data = await response.json();
    console.log('cache miss', data);
    cache.put('exchange-rate', data, 1000 * 60 * 60 * 24);
    return data;
  } catch (e) {
    console.error(e);
  }
  return { ethereum: { usd: undefined } };
}
