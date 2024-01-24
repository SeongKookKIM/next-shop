import { connectDB } from "@/util/MongoData";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("next-shop");

  const findPost = await db
    .collection("transaction")
    .findOne({ _id: new ObjectId(req.body._id) });

  if (findPost) {
    return res.status(200).json(findPost);
  } else {
    return res.status(403).send("db데이터 목록 조회 실패하였습니다.");
  }
}
