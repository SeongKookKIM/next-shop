import { connectDB } from "@/util/MongoData";
import { ObjectId } from "mongodb";
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
  let db = (await connectDB).db("next-shop");
  const id = req.query.id as string;

  let findPost = await db
    .collection("community")
    .findOne({ _id: new ObjectId(id) });

  return res.status(200).json(findPost);
}
