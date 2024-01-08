import { connectDB } from "@/util/MongoData";
import ClickNoitce from "../components/notice/ClickNoitce";
import { NoticePostType } from "../Type";

async function page() {
  let db = (await connectDB).db("next-shop");
  let noticePost: NoticePostType[] | undefined = (
    await db.collection("notice").find().toArray()
  ).map((item) => ({
    _id: item._id.toString(),
    title: item.title,
    date: item.date,
    description: item.description,
  }));

  return (
    <div className="notice-inner">
      <ul>
        <ClickNoitce noticePost={noticePost} />
      </ul>
    </div>
  );
}

export default page;
