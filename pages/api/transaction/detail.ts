import { connectDB } from "@/util/MongoData";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("next-shop");

  const result = await db
    .collection("transaction")
    .findOne({ _id: new ObjectId(req.body._id) });

  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(403).send("db조회에 실패하였습니다.");
  }
}
