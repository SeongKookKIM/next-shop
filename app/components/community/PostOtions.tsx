"use client";

import { UserType } from "@/app/Type";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CommunityBgType {
  setClickBtn: React.Dispatch<React.SetStateAction<boolean>>;
  findPostId: string | undefined;
  findUserName: string | undefined;
}

function PostOtions({
  setClickBtn,
  findPostId,
  findUserName,
}: CommunityBgType) {
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

  const handlerDeletePost = () => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      axios
        .post(`/api/community/delete?id=${findPostId}`)
        .then((res) => {
          if (res.status === 200) {
            alert(res.data);
            router.push("/community");
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
    <div className={`community-options ${show}`}>
      <div className="community-options-inner">
        <ul>
          <li>
            <span
              onClick={() => {
                router.push(`/communityEdit/${findPostId}`);
                document.querySelector("body")?.classList.remove("active");
              }}
              className={
                findUserName === user?.name
                  ? "name"
                  : findUserName === user?.nickName
                  ? "nickName"
                  : "block"
              }
            >
              수정하기
            </span>
          </li>
          <li>
            <span
              onClick={handlerDeletePost}
              className={
                findUserName === user?.name
                  ? "name"
                  : findUserName === user?.nickName
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
                  setClickBtn(false);
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
            setClickBtn(false);
            document.querySelector("body")?.classList.remove("active");
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default PostOtions;
