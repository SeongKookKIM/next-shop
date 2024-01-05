import { connectDB } from "@/util/MongoData";
import { NextApiRequest, NextApiResponse } from "next";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("next-shop");
  let findUser = await db
    .collection("user")
    .findOne({ phone: req.body.findPhone });

  if (findUser) {
    await db
      .collection("user")
      .updateOne(
        { phone: req.body.findPhone },
        { $set: { phone: req.body.changePhone } }
      );

    return res.status(200).send("연락처(핸드폰)를 변경하였습니다.");
  } else {
    return res.status(200).send("유저 정보가 존재하지 않습니다.");
  }
}
