"use client";

import { signOut } from "next-auth/react";
import React from "react";

function LogoutBtn() {
  return (
    <div className="logout">
      <span onClick={() => signOut()}>로그아웃</span>
    </div>
  );
}

export default LogoutBtn;
