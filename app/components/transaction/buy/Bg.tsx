"use client";

import { useEffect, useState } from "react";

interface TransactionOptionType {
  setTransactionOption: React.Dispatch<React.SetStateAction<boolean>>;
}

function Bg({ setTransactionOption }: TransactionOptionType) {
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
      className={`transaction-bg ${show}`}
      onClick={() => {
        setTransactionOption(false);

        document.querySelector("body")?.classList.remove("active");
      }}
    ></div>
  );
}

export default Bg;
