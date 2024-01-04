import { connectDB } from "@/util/MongoData";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("next-shop");
  let findName = await db
    .collection("user")
    .findOne({ nickName: req.body.user });

  if (findName) {
    return res.status(200).json(findName);
  } else {
    let oAuthDb = (await connectDB).db("test");
    let findOatuhName = await oAuthDb
      .collection("users")
      .findOne({ name: req.body.user });

    if (findOatuhName) {
      return res.status(200).json(findOatuhName);
    } else {
      return res.status(403).send("에러");
    }
  }
}
