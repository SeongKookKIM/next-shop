import React from "react";
import List from "../components/community/List";
import { connectDB } from "@/util/MongoData";
import { CommnunityPostType } from "../Type";

async function page() {
  const db = (await connectDB).db("next-shop");
  const findList: CommnunityPostType[] | undefined = (
    await db.collection("community").find({ type: "자유게시판" }).toArray()
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
