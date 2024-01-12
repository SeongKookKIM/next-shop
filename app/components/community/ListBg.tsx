"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CommunityBgType {
  setBgShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function ListBg({ setBgShow }: CommunityBgType) {
  const [show, setShow] = useState<string>("");

  let router = useRouter();

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
      className={`community-bg ${show}`}
      onClick={(e) => {
        e.stopPropagation();
        setBgShow(false);
        document.querySelector("body")?.classList.remove("active");
        router.refresh();
      }}
    ></div>
  );
}

export default ListBg;
