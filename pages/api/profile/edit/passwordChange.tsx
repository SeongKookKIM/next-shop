import { connectDB } from "@/util/MongoData";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("next-shop");

  const pwHashed = bcrypt.hashSync(req.body.password, 10);

  const changePassword = await db
    .collection("user")
    .updateOne({ id: req.body.userId }, { $set: { password: pwHashed } });

  if (changePassword) {
    return res.status(200).send("비밀번호를 변경하였습니다.");
  } else {
    return res.status(403).send("비밀번호 변경에 실패하였습니다.");
  }
}
