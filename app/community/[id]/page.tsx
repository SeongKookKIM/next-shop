import { CommnunityPostType } from "@/app/Type";
import Content from "@/app/components/community/Content";
import DetailBtn from "@/app/components/community/DetailBtn";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/MongoData";
import { ObjectId } from "mongodb";
import { Session, getServerSession } from "next-auth";

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

  let session: Session | null = await getServerSession(authOptions);

  // console.log(findPost);
  // console.log(session?.user);

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
                    <LuUser />
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
          <div className="cm-detail-bottom-inner"></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default page;
