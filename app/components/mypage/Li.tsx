"use client";

import { UserType } from "@/app/Type";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PropsType {
  title: string;
  session: Session | null;
}

function Li({ title, session }: PropsType) {
  const [user, setuser] = useState<UserType>();

  useEffect(() => {
    if (session) {
      setuser(session.user as UserType);
    }
  }, [session]);

  if (!session) {
    return (
      <div>
        <span>유저 정보가 없습니다.</span>
      </div>
    );
  }

  let router = useRouter();

  const handlerLink = (title: string) => {
    const userName = user?.name || user?.nickName;

    switch (title) {
      case "내 사업 판매하기":
        router.prefetch("/transaction/sell");
        router.push("/transaction/sell");
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 300);
        break;
      case "내 사업 매물":
        router.push("/myPost");
        break;
      case "내가 쓴 글":
        router.push("/myWrite");
        break;
      case "회원정보 수정":
        router.push(`/profile/${userName}?name=${userName}`);
        break;
      case "공지사항":
        router.push("/notice");
        break;
      case "문의하기":
        router.push("/inqury");
        break;
    }
  };

  return (
    <li
      onClick={() => {
        handlerLink(title);
      }}
    >
      <span>{title}</span>
    </li>
  );
}

export default Li;
