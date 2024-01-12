import Comment from "@/app/components/community/Comment";
import CommentList from "@/app/components/community/CommentList";
import Content from "@/app/components/community/Content";
import DetailBtn from "@/app/components/community/DetailBtn";
import { connectDB } from "@/util/MongoData";
import { ObjectId } from "mongodb";

import { LuUser } from "react-icons/lu";

interface PropsType {
  params: { id: string };
  searchParams: { id: string };
}

async function page(props: PropsType) {
  const db = (await connectDB).db("next-shop");
  const findPost = await db
    .collection("community")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <>
      {findPost ? (
        <div className="cm-detail">
          <div className="cm-detail-top-inner">
            <div className="cm-detail-top">
              <div className="cm-detail-type">
                <span>{findPost.type}</span>
              </div>
              <div className="cm-detail-title">
                <strong>{findPost.title}</strong>
              </div>
              <div className="cm-detail-user-info">
                <div className="cm-detail-user-info-left">
                  <div className="cm-detail-user-image">
                    {findPost.userImage === "" ? (
                      <LuUser />
                    ) : (
                      <img src={findPost.userImage} alt="user-image"></img>
                    )}
                  </div>
                  <div className="cm-detail-user-info">
                    <span>{findPost.userName}</span>
                    <span>{findPost.date.toISOString().split("T")[0]}</span>
                  </div>
                </div>
                <DetailBtn
                  findPostId={findPost._id.toString()}
                  findUserName={findPost.userName}
                />
              </div>
            </div>
          </div>
          <div className="cm-detail-mid-inner">
            <div className="cm-detail-mid">
              <Content content={findPost.content} />
            </div>
          </div>
          <div className="cm-detail-bottom-inner">
            <Comment
              postId={findPost._id.toString()}
              postCount={findPost.count}
            />
            <CommentList postId={findPost._id.toString()} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default page;
