import { connectDB } from "@/util/MongoData";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("next-shop");
  const findUserId = await db.collection("user").findOne({ id: req.body.id });
  const findUserEmail = await db
    .collection("user")
    .findOne({ email: req.body.email });
  const findUserNickName = await db
    .collection("user")
    .findOne({ email: req.body.nickName });
  const findUserPhone = await db
    .collection("user")
    .findOne({ email: req.body.phone });

  if (findUserId) {
    return res.status(201).send("이미 존재하는 아이디입니다.");
  } else if (findUserEmail) {
    return res.status(201).send("이미 존재하는 이메일입니다.");
  } else if (findUserNickName) {
    return res.status(201).send("이미 존재하는 닉네임입니다.");
  } else if (findUserPhone) {
    return res.status(201).send("이미 존재하는 핸드폰 입니다.");
  } else {
    const hash = await bcrypt.hash(req.body.password, 10);
    const userInfo = {
      id: req.body.id,
      email: req.body.email,
      password: hash,
      nickName: req.body.nickName,
      phone: req.body.phone,
    };
    await db.collection("user").insertOne(userInfo);

    return res.status(200).send("가입해주셔서 갑사합니다.");
  }
}
