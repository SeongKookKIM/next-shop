"use client";

import { useRouter } from "next/navigation";
import { LuClipboardEdit } from "react-icons/lu";

function WriteBtn() {
  let router = useRouter();

  return (
    <div
      className="commnuity-write-btn"
      onClick={() => router.push("/communityWrite")}
    >
      <LuClipboardEdit />
    </div>
  );
}

export default WriteBtn;
