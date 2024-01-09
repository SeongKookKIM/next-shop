"use client";

import { useEffect, useState } from "react";

interface CmBgType {
  setCmTypeShow: React.Dispatch<React.SetStateAction<boolean>>;
  setCmTypeChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

function Bg({ setCmTypeShow, setCmTypeChecked }: CmBgType) {
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
      className={`cm-bg ${show}`}
      onClick={() => {
        setCmTypeShow(false);
        setCmTypeChecked(false);
        document.querySelector("body")?.classList.remove("active");
      }}
    ></div>
  );
}

export default Bg;
