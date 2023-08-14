export interface ExchangeRate {
  ethereum: { usd?: number };
}

export async function getEthExchangeRate(): Promise<ExchangeRate | undefined> {
  try {
    return fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
    ).then((res) => res.json());
  } catch (e) {
    console.error(e);
  }
  return;
}
