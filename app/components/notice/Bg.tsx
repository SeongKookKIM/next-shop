"use client";

import { useEffect, useState } from "react";

interface NoticeBgType {
  setNoticeBg: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNoticeDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

function Bg({ setNoticeBg, setShowNoticeDetail }: NoticeBgType) {
  const [show, setShow] = useState<string>("");

  useEffect(() => {
    let bgShow = setTimeout(() => {
      setShow("show");
    }, 500);

    return () => {
      clearTimeout(bgShow);
      setShow("");
    };
  }, []);

  return (
    <div
      className={`notice-bg ${show}`}
      onClick={() => {
        setNoticeBg(false);
        setShowNoticeDetail(false);
        document.querySelector("body")?.classList.remove("active");
      }}
    ></div>
  );
}

export default Bg;
