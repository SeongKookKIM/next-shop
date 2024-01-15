import { connectDB } from "@/util/MongoData";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("next-shop");
  let findCommunity = await db.collection("community").find().toArray();
  if (findCommunity) {
    let result = await db.collection("community").find().toArray();
    result.sort((a, b) => b.date - a.date);

    const communityResult = result.slice(0, 5);

    return res.status(200).json(communityResult);
  } else {
    return res.status(403).send("커뮤니티 목록이 존재하지 않습니다.");
  }
}
