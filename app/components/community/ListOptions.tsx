"use client";

import { UserType } from "@/app/Type";
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
  const [user, setuser] = useState<UserType>();

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

  useEffect(() => {
    if (session) {
      setuser(session.data?.user as UserType);
    }
  }, [session]);

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
                commentName === user?.name
                  ? "name"
                  : commentName === user?.nickName
                  ? "nickName"
                  : "block"
              }
            >
              삭제하기
            </span>
          </li>
          <li>
            <span
              onClick={() => {
                alert(
                  "신고가 접수되었습니다. 확인 후 빠른 조치하도록 하겠습니다."
                );
                setTimeout(() => {
                  setBgShow(false);
                  document.querySelector("body")?.classList.remove("active");
                }, 100);
              }}
            >
              신고하기
            </span>
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
