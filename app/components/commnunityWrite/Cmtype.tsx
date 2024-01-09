"use client";

import { useEffect, useState } from "react";
import { LuXCircle } from "react-icons/lu";

interface CmBgType {
  setCmTypeShow: React.Dispatch<React.SetStateAction<boolean>>;
  setCmTypeChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setCmType: React.Dispatch<React.SetStateAction<string>>;
}

function Cmtype({ setCmTypeShow, setCmTypeChecked, setCmType }: CmBgType) {
  const [show, setShow] = useState<string>("");

  const typeArray: string[] = [
    "자유게시판",
    "사업직거래 후기",
    "구인·구직",
    "Q&A",
    "유머·HOT",
  ];

  useEffect(() => {
    let bgShow = setTimeout(() => {
      setShow("show");
    }, 700);

    return () => {
      clearTimeout(bgShow);
      setShow("");
    };
  }, []);

  const handlerClickType = (type: string) => {
    setCmType(type);
    setCmTypeShow(false);
    setCmTypeChecked(false);
    document.querySelector("body")?.classList.remove("active");
  };

  return (
    <div className={`cm-type-box ${show}`}>
      <div className="type-header">
        <strong>문의유형 선택</strong>
        <LuXCircle
          onClick={() => {
            setCmTypeShow(false);
            setCmTypeChecked(false);
            document.querySelector("body")?.classList.remove("active");
          }}
        />
      </div>
      <div className="type-body">
        <ul>
          {typeArray.map((type, idx) => {
            return (
              <li
                key={idx}
                onClick={() => {
                  handlerClickType(type);
                }}
              >
                <span>{type}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Cmtype;
