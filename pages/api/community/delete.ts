import { connectDB } from "@/util/MongoData";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("next-shop");
  let findPost = await db
    .collection("community")
    .findOne({ _id: new ObjectId(req.query.id as string) });

  if (findPost) {
    await db
      .collection("community")
      .deleteOne({ _id: new ObjectId(req.query.id as string) });

    await db
      .collection("comment")
      .deleteMany({ postId: req.query.id as string });

    return res.status(200).send("게시물을 삭제하였습니다.");
  } else {
    return res.status(403).send("게시물 삭제에 실패하였습니다.");
  }
}
