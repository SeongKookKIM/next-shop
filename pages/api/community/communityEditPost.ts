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
    .findOne({ _id: new ObjectId(req.body._id) });

  if (findPost) {
    let postEdit = {
      type: req.body.type,
      title: req.body.title,
      content: req.body.content,
    };

    await db
      .collection("community")
      .updateOne({ _id: new ObjectId(req.body._id) }, { $set: postEdit });

    return res.status(200).send("글을 수정하였습니다.");
  } else {
    return res.status(403).send("글 수정에 실패하였습니다.");
  }
}
