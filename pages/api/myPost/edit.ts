import { connectDB } from "@/util/MongoData";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("next-shop");

  let findId = req.query._id;

  await db
    .collection("transaction")
    .updateOne({ _id: new ObjectId(findId as string) }, { $set: req.body });

  return res.status(200).send("게시물 수정 완료하였습니다.");
}
