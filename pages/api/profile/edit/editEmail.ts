import { connectDB } from "@/util/MongoData";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("next-shop");
  let findEmail = await db
    .collection("user")
    .findOne({ email: req.body.findEmail });

  if (findEmail) {
    let edit = await db
      .collection("user")
      .updateOne(
        { email: req.body.findEmail },
        { $set: { email: req.body.changeEmail } }
      );

    return res.status(200).send("이메일을 변경하였습니다.");
  } else {
    return res.status(403).send("이메일 변경에 실패하였습니다.");
  }
}
