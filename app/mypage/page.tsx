"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";

function page() {
  const router = useRouter();

  return (
    <div className="login">
      <div className="login-inner">
        <h1 onClick={() => router.push("/")}>SHOP</h1>
        <form>
          <input type="text" name="id" placeholder="아이디를 입력해주세요." />
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <button type="submit">로그인</button>
        </form>
        <div className="login-signin">
          <span>회원가입</span>
        </div>

        <div className="oauth-login-wrapper">
          <ul>
            <li>
              <FcGoogle /> <span>구글 로그인</span>
            </li>
            <li>
              <GrGithub />
              <span> Github 로그인</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default page;
