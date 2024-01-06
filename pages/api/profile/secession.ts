import { connectDB } from "@/util/MongoData";
import { NextApiRequest, NextApiResponse } from "next";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: Session | null = await getServerSession(req, res, authOptions);

  let db = (await connectDB).db("next-shop");

  console.log(session?.user);

  if (session) {
    const findUser = session.user;

    let deleteUser = await db.collection("user").deleteOne(findUser);
    if (deleteUser) {
      return res.status(200).send("회원탈퇴에 성공하였습니다.");
    } else {
      return res.status(403).send("회원탈퇴에 실패하였습니다.");
    }
  } else {
    return res.status(403).send("로그인 정보가 존재하지 않습니다.");
  }
}
