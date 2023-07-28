import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { Pool } from "@/types/mongo";
import { WithId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WithId<Pool>[]>
) {
  try {
    const client = await clientPromise;
    const db = client.db("sandbox");
    const posts = await db
      .collection<Pool>("pools")
      .find({})
      .limit(20)
      .toArray();
    res.json(posts);
  } catch (e) {
    console.error(e);
  }
}
