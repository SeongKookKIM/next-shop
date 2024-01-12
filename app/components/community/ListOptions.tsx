"use client";

import axios from "axios";
import { ObjectId } from "mongodb";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CommentListType {
  setBgShow: React.Dispatch<React.SetStateAction<boolean>>;
  commentId: ObjectId | undefined;
  commentName: string | undefined;
}

function ListOptions({ setBgShow, commentId, commentName }: CommentListType) {
  const [show, setShow] = useState<string>("");

  let session = useSession();

  let router = useRouter();

  useEffect(() => {
    let bgShow = setTimeout(() => {
      setShow("show");
    }, 700);

    return () => {
      clearTimeout(bgShow);
      setShow("");
    };
  }, []);

  const handlerDeleteComment = () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      axios
        .post("/api/community/commentDelete", { _id: commentId })
        .then((res) => {
          if (res.status === 200) {
            alert(res.data);
            document.querySelector("body")?.classList.remove("active");
            setTimeout(() => {
              router.refresh();
            }, 100);
          }
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  return (
    <div className={`comment-options ${show}`}>
      <div className="comment-options-inner">
        <ul>
          <li>
            <span
              onClick={handlerDeleteComment}
              className={
                commentName === session.data?.user?.name
                  ? "name"
                  : commentName === session.data?.user?.nickName
                  ? "nickName"
                  : "block"
              }
            >
              삭제하기
            </span>
          </li>
          <li>
            <span>신고하기</span>
          </li>
        </ul>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setBgShow(false);
            document.querySelector("body")?.classList.remove("active");
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default ListOptions;
