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

    let findUser = user.name || user.nickName;

    if (findUser) {
      let result = await db
        .collection("transaction")
        .find({ userName: findUser })
        .toArray();

      if (result) {
        return res.status(200).json(result);
      } else {
        return res.status(403).send("게시물이 존재하지 않습니다.");
      }
    }
  } else {
    return res.status(403).send("유저 데이터가 없습니다.");
  }
}
