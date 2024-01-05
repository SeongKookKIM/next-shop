import { connectDB } from "@/util/MongoData";
import { NextApiRequest, NextApiResponse } from "next";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("next-shop");
  let findName = await db
    .collection("user")
    .findOne({ nickName: req.body.findName });

  if (findName) {
    await db
      .collection("user")
      .updateOne(
        { nickName: req.body.findName },
        { $set: { nickName: req.body.changeName } }
      );

    return res.status(200).send("닉네임(이름)을 변경하였습니다.");
  } else {
    return res.status(200).send("유저 정보가 존재하지 않습니다.");
  }
}
