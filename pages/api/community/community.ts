import { UserType } from "@/app/Type";
import { connectDB } from "@/util/MongoData";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getToken({ req });
  let db = (await connectDB).db("next-shop");

  if (session && session.user) {
    let user = session.user as UserType;

    let insertData = {
      userId: user.id || "",
      userName: user.name || user.nickName || "",
      type: req.body.type,
      title: req.body.title,
      content: req.body.content,
      date: new Date(),
      count: 0,
    };

    let insertDb = await db.collection("community").insertOne(insertData);

    if (insertDb) {
      return res.status(200).send("글 작성이 완료되었습니다.");
    } else {
      return res.status(403).send("글 작성에 실패하였습니다.");
    }
  } else {
    return res.status(403).send("해다 유저 정보가 존재하지 않습니다.");
  }
}
