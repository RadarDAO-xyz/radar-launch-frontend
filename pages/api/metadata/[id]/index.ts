import { NextApiRequest, NextApiResponse } from "next";
import https from "https";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, string>>
) {
  if (req.method !== "GET") {
    return res.status(404).json({});
  }
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/metadata/${req.query.id}`,
      {
        agent: httpsAgent,
      }
    ).then((res) => res.json());
    return res.status(200).json(response);
  } catch (e) {
    console.error(e);
  }

  return res.status(400).json({});
}
