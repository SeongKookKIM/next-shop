import React from "react";
import List from "../components/community/List";
import { connectDB } from "@/util/MongoData";
import { CommnunityPostType } from "../Type";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

async function page() {
  let session = await getServerSession(authOptions);

  const db = (await connectDB).db("next-shop");
  const findList: CommnunityPostType[] | undefined = (
    await db
      .collection("community")
      .find({ userName: session?.user.name || session?.user.nickName })
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
