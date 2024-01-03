"use client";

import { signOut } from "next-auth/react";

function page() {
  return (
    <div>
      마이페이지
      <button
        type="button"
        onClick={() => {
          signOut();
        }}
      >
        로그아웃
      </button>
    </div>
  );
}

export default page;
