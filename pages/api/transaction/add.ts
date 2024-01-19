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

    req.body.userName = user.name || user.nickName || "";
    req.body.userId = user.id || "";

    await db.collection("transaction").insertOne(req.body);

    return res.status(200).send("판매 등록하였습니다.");
  } else {
    return res.status(403).send("유저 데이터가 없습니다.");
  }
}
