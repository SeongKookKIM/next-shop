"use client";

import { NoticePostType } from "@/app/Type";
import { useState } from "react";
import { LuChevronRight } from "react-icons/lu";
import Bg from "./Bg";
import DetailNotice from "./DetailNotice";

interface NoticePropsType {
  noticePost: NoticePostType[] | undefined;
}

function ClickNoitce({ noticePost }: NoticePropsType) {
  const [noticeBg, setNoticeBg] = useState<boolean>(false);
  const [showNoticeDetail, setShowNoticeDetail] = useState<boolean>(false);
  const [noticeDetail, setNoticeDetail] = useState<NoticePostType>();

  const handlerClickNotice = (post: NoticePostType) => {
    setNoticeBg(true);
    document.querySelector("body")?.classList.add("active");
    setNoticeDetail(post);
  };

  return (
    <>
      {noticePost && noticePost.length > 0 ? (
        <>
          {noticePost.map((post, idx) => {
            return (
              <li
                key={idx}
                onClick={() => {
                  handlerClickNotice(post);
                }}
              >
                <p>{post.title}</p>
                <span>{post.date.toISOString().split("T")[0]}</span>
                <LuChevronRight />
              </li>
            );
          })}
        </>
      ) : (
        <li className="notice-error">
          <span>공지사항이 없습니다.</span>
        </li>
      )}{" "}
      {noticeBg && (
        <Bg
          setNoticeBg={setNoticeBg}
          setShowNoticeDetail={setShowNoticeDetail}
        />
      )}
      {noticeBg && (
        <DetailNotice
          setNoticeBg={setNoticeBg}
          setShowNoticeDetail={setShowNoticeDetail}
          noticeDetail={noticeDetail}
        />
      )}
    </>
  );
}

export default ClickNoitce;
