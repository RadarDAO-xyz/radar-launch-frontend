import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { Project } from "@/types/mongo";
import { WithId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WithId<Project>[]>
) {
  try {
    const client = await clientPromise;
    const db = client.db("sandbox");
    const posts = await db
      .collection<Project>("projects")
      .find({})
      .limit(20)
      .toArray();
    res.json(posts);
  } catch (e) {
    console.error(e);
  }
}
