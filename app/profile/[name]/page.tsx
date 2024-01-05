"use client";

import { UserType } from "@/app/Type";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { LuCircle } from "react-icons/lu";
import Bg from "./Bg";
import IdEdit from "./IdEdit";

function page() {
  const params = useSearchParams();

  const [userInfo, setUserInfo] = useState<UserType>();

  const [editBtn, setEditBtn] = useState<boolean>(false);
  const [editIdBtn, setEditIdBtn] = useState<boolean>(false);

  useEffect(() => {
    const userQuery: string | undefined | null = params?.get("name");
    // setUserName(userQuery);

    if (userQuery) {
      axios
        .post("/api/profile/info", { user: userQuery })
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [params]);

  const handlerEdit = (status: string) => {
    document.querySelector("body")?.classList.add("active");
    setEditBtn(true);

    switch (status) {
      case "아이디":
        setEditIdBtn(true);
        break;
      case "로그인":
        break;
      case "회원가입":
        break;
      case "회원정보":
        break;
    }
  };

  return (
    <div className="profile-inner">
      <div className="profile-login-info">
        <strong>로그인 정보</strong>
        <ul>
          <li>
            <p>아이디</p>
            <span>{userInfo?.id || ""}</span>
            {userInfo?.nickName && (
              <button
                type="button"
                onClick={() => {
                  handlerEdit("아이디");
                }}
              >
                변경
              </button>
            )}
          </li>
          <li>
            <p>이메일</p>
            <span>{userInfo?.email}</span>
            {userInfo?.nickName && <button type="button">변경</button>}
          </li>
          <li>
            <p>비밀번호</p>
            <span>
              <LuCircle />
              <LuCircle />
              <LuCircle />
              <LuCircle />
              <LuCircle />
              <LuCircle />
              <LuCircle />
            </span>
            {userInfo?.nickName && <button type="button">변경</button>}
          </li>
        </ul>
      </div>
      <div className="profile-user-info">
        <strong>개인 정보</strong>
        <ul>
          <li>
            <p>닉네임</p>
            <span>{userInfo?.nickName || userInfo?.name}</span>
            <button type="button">변경</button>
          </li>
          <li>
            <p>휴대폰번호</p>
            <span>{userInfo?.phone || ""}</span>
            {userInfo?.phone && <button type="button">변경</button>}
          </li>
        </ul>
      </div>
      <div className="profile-secession">
        <span>회원탈퇴하기</span>
      </div>

      {editBtn && <Bg setEditBtn={setEditBtn} setEditIdBtn={setEditIdBtn} />}
      {editIdBtn && (
        <IdEdit
          setEditBtn={setEditBtn}
          setEditIdBtn={setEditIdBtn}
          userId={userInfo?.id}
        />
      )}
    </div>
  );
}

export default page;
