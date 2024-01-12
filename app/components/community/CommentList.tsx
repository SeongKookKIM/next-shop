import { connectDB } from "@/util/MongoData";

import { LuUser } from "react-icons/lu";
import ListOptionsBtn from "./ListOptionsBtn";
import { CommentType } from "@/app/Type";

interface FindPostType {
  postId: string | undefined;
}

async function CommentList({ postId }: FindPostType) {
  let db = (await connectDB).db("next-shop");
  let findComment = await db
    .collection("comment")
    .find({ postId: postId })
    .toArray();

  return (
    <div className="comment-list">
      <ul>
        {findComment && findComment.length > 0 ? (
          <>
            {findComment.map((comment, idx) => {
              const propsComment = JSON.parse(JSON.stringify(comment));

              return (
                <li key={idx}>
                  <div className="comment-list-top">
                    <div className="comment-list-user">
                      <div className="comment-list-user-image">
                        {comment.commentImage ? (
                          <img src={comment.commentImage} />
                        ) : (
                          <LuUser />
                        )}
                      </div>
                      <div className="comment-list-user-name">
                        <p>{comment.commentName}</p>
                      </div>
                    </div>
                    <ListOptionsBtn comment={propsComment as CommentType} />
                  </div>
                  <div className="commnet-list-mid">
                    <p>{comment.comment}</p>
                    <span>{comment.date.toISOString().split("T")[0]}</span>
                  </div>
                </li>
              );
            })}
          </>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}

export default CommentList;
