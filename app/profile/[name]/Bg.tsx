"use client";

import { useEffect, useState } from "react";

interface editBtnType {
  setEditBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setEditIdBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setEditEmailBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setEditPasswordBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setEditNameBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setEditPhoneBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Bg({
  setEditBtn,
  setEditIdBtn,
  setEditEmailBtn,
  setEditPasswordBtn,
  setEditNameBtn,
  setEditPhoneBtn,
}: editBtnType) {
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
        setEditEmailBtn(false);
        setEditPasswordBtn(false);
        setEditNameBtn(false);
        setEditPhoneBtn(false);
        document.querySelector("body")?.classList.remove("active");
      }}
    ></div>
  );
}

export default Bg;
