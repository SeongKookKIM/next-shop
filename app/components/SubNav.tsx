"use client";

import DarkMode from "@/app/DarkMode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import NavSlide from "./community/NavSlide";

interface PropsType {
  title: string;
}

function SubNav({ title }: PropsType) {
  const [scrollPos, setScrollPos] = useState<number>(0);
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    function handleScroll() {
      const currentScrollPos = window.scrollY;
      if (scrollPos > currentScrollPos) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(false);
      }
      setScrollPos(currentScrollPos);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPos]);

  const handlerRouter = () => {
    switch (title) {
      case "마이페이지":
        router.push("/");
        break;
      case "로그인":
        router.push("/");
        break;
      case "회원가입":
        router.push("/login");
        break;
      case "회원정보":
        router.push("/mypage");
        break;
      case "문의하기":
        router.back();
        break;
      case "공지사항":
        router.back();
        break;
      case "커뮤니티":
        router.back();
        break;
      case "글쓰기":
        router.back();
        break;
      case "글수정":
        router.back();
        break;
      case "사업자 거래":
        router.back();
        break;
    }
  };

  return (
    <>
      <div className={isNavVisible ? "m-sub-nav" : "m-sub-nav hide"}>
        <div className="m-sub-nav-inner">
          <div className="back title">
            <LuArrowLeft onClick={handlerRouter} />
            <span>{title}</span>
          </div>
          <DarkMode />
        </div>
        {title === "커뮤니티" && <NavSlide />}
      </div>
    </>
  );
}

export default SubNav;
