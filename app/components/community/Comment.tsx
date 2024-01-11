import { CommnunityPostType } from "@/app/Type";
import CommentWrite from "./CommentWrite";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface FindPostType {
  postId: string | undefined;
  postCount: number | undefined;
}

async function Comment({ postId, postCount }: FindPostType) {
  let session: Session | null = await getServerSession(authOptions);

  return (
    <div className="community-comment">
      <div className="comment-count-box">
        <strong>댓글{postCount}</strong>
      </div>
      <CommentWrite postId={postId} session={session} />
    </div>
  );
}

export default Comment;
