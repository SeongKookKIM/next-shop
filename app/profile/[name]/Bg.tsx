"use client";

import { useEffect, useState } from "react";

interface editBtnType {
  setEditBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setEditIdBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Bg({ setEditBtn, setEditIdBtn }: editBtnType) {
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
      className={`profile-bg ${show}`}
      onClick={() => {
        setEditBtn(false);
        setEditIdBtn(false);
        document.querySelector("body")?.classList.remove("active");
      }}
    ></div>
  );
}

export default Bg;
