import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, string>>
) {
  if (req.method !== "GET") {
    return res.status(404).json({});
  }
  return fetch(`${process.env.BACKEND_URL}/metadata/${req.query.id}`).then(
    (res) => res.json()
  );
}
