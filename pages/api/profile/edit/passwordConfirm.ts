import { connectDB } from "@/util/MongoData";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("next-shop");

  let findUser = await db.collection("user").findOne({ id: req.body.userId });

  if (findUser) {
    const passwordChecked = await bcrypt.compare(
      req.body.defaultPassword,
      findUser.password
    );
    if (passwordChecked) {
      return res.status(200).send("기존 비밀번호 입력 성공하였습니다.");
    } else {
      return res.status(403).send("비밀번호가 틀리셨습니다.");
    }
  } else {
    return res.status(403).send("비밀번호입력에 실패하였습니다.");
  }
}
