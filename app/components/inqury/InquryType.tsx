"use client";
import { useEffect, useState } from "react";
import { LuXCircle } from "react-icons/lu";
interface InquryBgType {
  setInquryTypeShow: React.Dispatch<React.SetStateAction<boolean>>;
  setInquryTypeChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setInquryType: React.Dispatch<React.SetStateAction<string>>;
}

function InquryType({
  setInquryTypeShow,
  setInquryTypeChecked,
  setInquryType,
}: InquryBgType) {
  const [show, setShow] = useState<string>("");

  const typeArray: string[] = ["일반문의", "제휴문의", "기타문의", "신고문의"];

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
    setInquryType(type);
    setInquryTypeShow(false);
    setInquryTypeChecked(false);
    document.querySelector("body")?.classList.remove("active");
  };

  return (
    <div className={`inqury-type-box ${show}`}>
      <div className="inqury-header">
        <strong>문의유형 선택</strong>
        <LuXCircle
          onClick={() => {
            setInquryTypeShow(false);
            setInquryTypeChecked(false);
            document.querySelector("body")?.classList.remove("active");
          }}
        />
      </div>
      <div className="inqury-body">
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

export default InquryType;
