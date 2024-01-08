"use client";

import { NoticePostType } from "@/app/Type";
import { useEffect, useState } from "react";
import { LuXCircle } from "react-icons/lu";

interface NoticeBgType {
  setNoticeBg: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNoticeDetail: React.Dispatch<React.SetStateAction<boolean>>;
  noticeDetail: NoticePostType | undefined;
}

function DetailNotice({
  setNoticeBg,
  setShowNoticeDetail,
  noticeDetail,
}: NoticeBgType) {
  const [show, setShow] = useState<string>("");

  useEffect(() => {
    let bgShow = setTimeout(() => {
      setShow("show");
    }, 700);

    return () => {
      clearTimeout(bgShow);
      setShow("");
    };
  }, []);

  return (
    <div className={`notice-detail ${show}`}>
      <div className="notice-header">
        <div className="notice-header-top">
          <strong>{noticeDetail && noticeDetail.title}</strong>
          <LuXCircle
            onClick={() => {
              setNoticeBg(false);
              setShowNoticeDetail(false);
              document.querySelector("body")?.classList.remove("active");
            }}
          />
        </div>
        <div className="notice-header-bottom">
          <p className="notice-date">
            {noticeDetail && noticeDetail.date.toISOString().split("T")[0]}
          </p>
        </div>
      </div>
      <div className="notice-body">
        <p>{noticeDetail && noticeDetail.description}</p>
      </div>
    </div>
  );
}

export default DetailNotice;
