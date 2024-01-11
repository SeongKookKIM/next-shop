"use client";

import { useState } from "react";
import Bg from "./Bg";
import PostOtions from "./PostOtions";
import { SessionProvider } from "next-auth/react";

interface FindPostType {
  findPostId: string | undefined;
  findUserName: string | undefined;
}

function DetailBtn({ findPostId, findUserName }: FindPostType) {
  const [clickBtn, setClickBtn] = useState<boolean>(false);

  const handlerClickBtn = () => {
    setClickBtn(true);
    document.querySelector("body")?.classList.add("active");
  };

  return (
    <div className="cm-detail-user-info-right" onClick={handlerClickBtn}>
      <span>···</span>
      {clickBtn && <Bg setClickBtn={setClickBtn} />}
      {clickBtn && (
        <SessionProvider>
          <PostOtions
            setClickBtn={setClickBtn}
            findPostId={findPostId}
            findUserName={findUserName}
          />
        </SessionProvider>
      )}
    </div>
  );
}

export default DetailBtn;
