import React from "react";
import List from "../components/community/List";
import { connectDB } from "@/util/MongoData";
import { CommnunityPostType, UserType } from "../Type";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

async function page() {
  let session: Session | null = await getServerSession(authOptions);
  const user = session?.user as UserType;

  const db = (await connectDB).db("next-shop");
  const findList: CommnunityPostType[] | undefined = (
    await db
      .collection("community")
      .find({ userName: user.name || user.nickName })
      .toArray()
  ).map((item) => ({
    _id: item._id,
    userId: item.userId,
    userName: item.userName,
    type: item.type,
    title: item.title,
    content: item.content,
    date: item.date,
    count: item.count,
  }));

  return (
    <>
      <List findList={findList} />
    </>
  );
}

export default page;
