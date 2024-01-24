import { UserType } from "@/app/Type";
import { connectDB } from "@/util/MongoData";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("next-shop");

  let findPost = await db
    .collection("transaction")
    .findOne({ _id: new ObjectId(req.body._id) });

  if (findPost) {
    await db
      .collection("transaction")
      .deleteOne({ _id: new ObjectId(req.body._id) });

    return res.status(200).send("해당 게시물을 삭제하였습니다.");
  }

  return res.status(403).send("해당 게시물이 db데이터 존재하지 않습니다.");
}
