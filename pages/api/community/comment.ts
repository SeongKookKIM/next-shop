import { connectDB } from "@/util/MongoData";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

type UserType = {
  id?: string | undefined | null;
  email?: string | undefined | null;
  nickName?: string | undefined | null;
  phone?: string | undefined | null;
  name?: string | undefined | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getToken({ req });

  let db = (await connectDB).db("next-shop");

  if (session && session.user) {
    let user = session.user as UserType;

    const commentData = {
      postId: req.body._id,
      commentName: user.name || user.nickName,
      comment: req.body.comment,
      date: new Date(),
    };

    let findCm = await db
      .collection("community")
      .findOne({ _id: new ObjectId(req.body._id) });

    if (findCm) {
      let insertCommentData = await db
        .collection("comment")
        .insertOne(commentData);

      if (insertCommentData) {
        let count = findCm.count + 1;

        await db
          .collection("community")
          .updateOne(
            { _id: new ObjectId(req.body._id) },
            { $set: { count: count } }
          );

        return res.status(200).send("댓글을 등록하셨습니다.");
      } else {
        return res.status(403).send("댓글 등록에 실패하였습니다.");
      }
    } else {
      return res.status(403).send("커뮤니티 내용이 존재하지 않습니다.");
    }
  } else {
    return res.status(403).send("유저 데이터가 없습니다.");
  }
}
