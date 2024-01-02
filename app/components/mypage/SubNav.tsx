"use client";

import DarkMode from "@/app/DarkMode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";

function SubNav() {
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

  return (
    <div className={isNavVisible ? "m-sub-nav" : "m-sub-nav hide"}>
      <div className="m-sub-nav-inner">
        <div className="back title">
          <LuArrowLeft onClick={() => router.push("/")} />
          <span>로그인</span>
        </div>
        <DarkMode />
      </div>
    </div>
  );
}

export default SubNav;
