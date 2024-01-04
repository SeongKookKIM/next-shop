import { connectDB } from "@/util/MongoData";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("next-shop");
  let findId = await db.collection("user").findOne({ id: req.body.id });

  if (findId) {
    let edit = await db
      .collection("user")
      .updateOne({ id: req.body.findId }, { $set: { id: req.body.changeId } });

    return res.status(200).send("아이디를 변경하였습니다.");
  } else {
    return res.status(403).send("아이디 변경에 실패하였습니다.");
  }
}
