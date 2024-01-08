"use client";

import { useEffect, useState } from "react";

interface InquryBgType {
  setInquryTypeShow: React.Dispatch<React.SetStateAction<boolean>>;
  setInquryTypeChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

function Bg({ setInquryTypeShow, setInquryTypeChecked }: InquryBgType) {
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
      className={`inqury-bg ${show}`}
      onClick={() => {
        setInquryTypeShow(false);
        setInquryTypeChecked(false);
        document.querySelector("body")?.classList.remove("active");
      }}
    ></div>
  );
}

export default Bg;
