import { connectDB } from "@/util/MongoData";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = (await connectDB).db("next-shop");

  const result = await db.collection("transaction").find().toArray();

  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(200).send("리스트 목록 조회 오류");
  }
}
