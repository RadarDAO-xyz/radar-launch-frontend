export interface ExchangeRate {
  ethereum: { usd?: number };
}

export async function getEthExchangeRate(): Promise<ExchangeRate> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`,
    );
    if (!response.ok) {
      console.error(response);
      throw new Error('Error fetching exchange rate');
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
  return { ethereum: { usd: undefined } };
}
