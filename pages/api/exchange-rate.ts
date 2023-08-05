import { NextApiRequest, NextApiResponse } from "next";
import cache from "memory-cache";

interface ExchangeRate {
  rates: Record<string, number>;
}

export async function fetchExchangeRate(
  symbols: string
): Promise<ExchangeRate | undefined> {
  try {
    return fetch(
      `http://api.coinlayer.com/api/live?access_key=${process.env.COINLAYER_API_KEY}&symbols=${symbols}`
    ).then((res) => res.json());
  } catch (e) {
    console.error(e);
  }
  return;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExchangeRate | { message: string }>
) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Not found" });
  }
  try {
    const { symbols } = req.query;
    console.log({ symbols });

    if (symbols === undefined) {
      return res.status(400).json({ message: "Invalid from and to" });
    }

    let response: ExchangeRate | null | undefined = cache.get("exchange-rate");
    if (response != null) {
      return res.status(200).json(response);
    }

    response = await fetchExchangeRate(symbols.toString());
    if (response !== undefined) {
      // cache for a whole day
      cache.put("exchange-rate", response, 1000 * 60 * 60 * 24);
      return res.status(200).json(response);
    }
  } catch (e) {
    console.log(e);
  }
  return res.status(400).json({ message: "Error has occured" });
}
