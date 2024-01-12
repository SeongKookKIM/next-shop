"use client";

import { CommentType } from "@/app/Type";
import { useState } from "react";
import ListBg from "./ListBg";
import ListOptions from "./ListOptions";
import { SessionProvider } from "next-auth/react";

interface CommentPropsType {
  comment: CommentType | null;
}

function ListOptionsBtn({ comment }: CommentPropsType) {
  const [bgShow, setBgShow] = useState<boolean>(false);

  const handlerListOptions = () => {
    setBgShow(true);
    document.querySelector("body")?.classList.add("active");
  };

  return (
    <div className="comment-list-options" onClick={handlerListOptions}>
      <span>···</span>
      <SessionProvider>
        {bgShow && <ListBg setBgShow={setBgShow} />}
        {bgShow && (
          <ListOptions
            setBgShow={setBgShow}
            commentId={comment?._id}
            commentName={comment?.commentName}
          />
        )}
      </SessionProvider>
    </div>
  );
}

export default ListOptionsBtn;
