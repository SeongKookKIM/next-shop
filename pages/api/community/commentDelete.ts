import { connectDB } from "@/util/MongoData";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("next-shop");
  let findCommentPost = await db
    .collection("comment")
    .findOne({ _id: new ObjectId(req.body._id as string) });

  if (findCommentPost) {
    let findCm = await db
      .collection("community")
      .findOne({ _id: new ObjectId(findCommentPost.postId as string) });

    if (findCm) {
      await db
        .collection("comment")
        .deleteOne({ _id: new ObjectId(req.body._id as string) });

      let commentCount = findCm.count - 1;

      await db
        .collection("community")
        .updateOne(
          { _id: new ObjectId(findCommentPost.postId as string) },
          { $set: { count: commentCount } }
        );

      return res.status(200).send("댓글을 삭제하였습니다.");
    } else {
      return res.status(403).send("댓글 삭제에 실패하였습니다.");
    }
  } else {
    return res.status(403).send("댓글 삭제에 실패하였습니다.");
  }
}
