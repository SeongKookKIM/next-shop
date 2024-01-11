"use client";

import axios from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FindPostType {
  postId: string | undefined;
  session: Session | null;
}

function CommentWrite({ postId, session }: FindPostType) {
  const [comment, setComment] = useState<string>("");

  let router = useRouter();

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 104)}px`;
  };

  const handlerCommentBtn = () => {
    let postData = {
      _id: postId,
      comment,
    };

    if (window.confirm("댓글을 등록하시겠습니까?")) {
      axios
        .post("/api/community/comment", postData)
        .then((res) => {
          setComment("");
          alert(res.data);
          setTimeout(() => {
            router.refresh();
          }, 100);
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  return (
    <div className="comment-write-wrapper">
      <div className="comment-write-inner">
        <div className="comment-user">
          <strong>이름</strong>
        </div>
        <textarea
          typeof="text"
          placeholder="댓글을 남겨주세요."
          value={comment}
          onChange={(e) => {
            handleTextareaChange(e);
          }}
        />
        <div className="comment-write-btn">
          <span onClick={handlerCommentBtn}>등록</span>
        </div>
        {!session && (
          <div className="comment-login">
            <p>로그인 후 사용해주세요.</p>
            <div className="login-box">
              <span onClick={() => router.push("/login")}>로그인</span>
              <span onClick={() => router.push("/join")}>회원가입</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentWrite;
