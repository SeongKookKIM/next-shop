import { connectDB } from "@/util/MongoData";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

type UserType = {
  id?: string | undefined | null;
  email?: string | undefined | null;
  nickName?: string | undefined | null;
  phone?: string | undefined | null;
  name?: string | undefined | null;
};

type InsertDataType = {
  inquryType: string | undefined;
  userId: string | undefined;
  userPhone: string | undefined | null;
  userName: string | undefined;
  inquryName: string | undefined;
  inquryEmail: string | undefined;
  inquryTitle: string | undefined;
  inquryDescription: string | undefined;
  inquryDate: Date | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getToken({ req });

  let db = (await connectDB).db("next-shop");

  if (session && session.user) {
    let user = session.user as UserType;

    let innsertData: InsertDataType = {
      userId: user.id || "",
      userPhone: user.phone || "",
      userName: user.name || user.nickName || "",
      inquryType: req.body.type,
      inquryName: req.body.name,
      inquryEmail: req.body.email,
      inquryTitle: req.body.title,
      inquryDescription: req.body.description,
      inquryDate: new Date(req.body.date),
    };

    let insertDb = await db.collection("inqury").insertOne(innsertData);

    if (insertDb) {
      return res.status(200).send("문의작성이 완료되었습니다.");
    } else {
      return res.status(403).send("문의작성이 실패하였습니다.");
    }
  } else {
    return res.status(403).send("유저 데이터가 없습니다.");
  }
}
