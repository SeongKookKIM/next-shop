"use client";

import { UserType } from "@/app/Type";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { LuCircle } from "react-icons/lu";
import Bg from "./Bg";
import IdEdit from "./edit/IdEdit";
import EmailEdit from "./edit/EmailEdit";
import PasswordEdit from "./edit/PasswordEdit";
import NameEdit from "./edit/NameEdit";
import { SessionProvider, signOut } from "next-auth/react";
import PhoneEdit from "./edit/PhoneEdit";

function page() {
  const params = useSearchParams();

  const [userInfo, setUserInfo] = useState<UserType>();

  const [editBtn, setEditBtn] = useState<boolean>(false);
  const [editIdBtn, setEditIdBtn] = useState<boolean>(false);
  const [editEmailBtn, setEditEmailBtn] = useState<boolean>(false);
  const [editPasswordBtn, setEditPasswordBtn] = useState<boolean>(false);
  const [editNameBtn, setEditNameBtn] = useState<boolean>(false);
  const [editPhoneBtn, setEditPhoneBtn] = useState<boolean>(false);

  let router = useRouter();

  useEffect(() => {
    const userQuery: string | undefined | null = params?.get("name");

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
      case "이메일":
        setEditEmailBtn(true);
        break;
      case "비밀번호":
        setEditPasswordBtn(true);
        break;
      case "닉네임":
        setEditNameBtn(true);
        break;
      case "핸드폰":
        setEditPhoneBtn(true);
        break;
    }
  };

  const handlerSecession = () => {
    if (window.confirm("회원을 탈퇴하시겠습니까?")) {
      axios
        .post("/api/profile/secession")
        .then(async (res) => {
          alert(res.data);
          await signOut({ redirect: true, callbackUrl: "/" });
        })
        .catch((err) => console.log(err));
    } else {
      return;
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
            {userInfo?.nickName && (
              <button
                type="button"
                onClick={() => {
                  handlerEdit("이메일");
                }}
              >
                변경
              </button>
            )}
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
            {userInfo?.nickName && (
              <button
                type="button"
                onClick={() => {
                  handlerEdit("비밀번호");
                }}
              >
                변경
              </button>
            )}
          </li>
        </ul>
      </div>
      <div className="profile-user-info">
        <strong>개인 정보</strong>
        <ul>
          <li>
            <p>닉네임</p>
            <span>{userInfo?.nickName || userInfo?.name}</span>
            {userInfo?.nickName && (
              <button
                type="button"
                onClick={() => {
                  handlerEdit("닉네임");
                }}
              >
                변경
              </button>
            )}
          </li>
          <li>
            <p>휴대폰번호</p>
            <span>{userInfo?.phone || ""}</span>
            {userInfo?.phone && (
              <button
                type="button"
                onClick={() => {
                  handlerEdit("핸드폰");
                }}
              >
                변경
              </button>
            )}
          </li>
        </ul>
      </div>
      {userInfo?.nickName && (
        <div className="profile-secession">
          <span onClick={handlerSecession}>회원탈퇴하기</span>
        </div>
      )}

      <SessionProvider>
        {editBtn && (
          <Bg
            setEditBtn={setEditBtn}
            setEditIdBtn={setEditIdBtn}
            setEditEmailBtn={setEditEmailBtn}
            setEditPasswordBtn={setEditPasswordBtn}
            setEditNameBtn={setEditNameBtn}
            setEditPhoneBtn={setEditPhoneBtn}
          />
        )}
        {editIdBtn && (
          <IdEdit
            setEditBtn={setEditBtn}
            setEditIdBtn={setEditIdBtn}
            userId={userInfo?.id}
          />
        )}

        {editEmailBtn && (
          <EmailEdit
            setEditBtn={setEditBtn}
            setEditEmailBtn={setEditEmailBtn}
            userEmail={userInfo?.email}
          />
        )}

        {editPasswordBtn && (
          <PasswordEdit
            setEditBtn={setEditBtn}
            setEditPasswordBtn={setEditPasswordBtn}
            userId={userInfo?.id}
          />
        )}
        {editNameBtn && (
          <NameEdit
            setEditBtn={setEditBtn}
            setEditNameBtn={setEditNameBtn}
            userName={userInfo?.nickName || userInfo?.name}
          />
        )}

        {editPhoneBtn && (
          <PhoneEdit
            setEditBtn={setEditBtn}
            setEditPhoneBtn={setEditPhoneBtn}
            userPhone={userInfo?.phone}
          />
        )}
      </SessionProvider>
    </div>
  );
}

export default page;
