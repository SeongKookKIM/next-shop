"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FcShop,
  FcBarChart,
  FcHome,
  FcComments,
  FcAbout,
} from "react-icons/fc";

export default function FooterNav() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const router = useRouter();

  const handleScroll = () => {
    const scrollY = window.scrollY;

    const pageHeight = document.documentElement.scrollHeight;

    const windowHeight = window.innerHeight;

    const bottomOffset = pageHeight - windowHeight;

    if (scrollY > bottomOffset - 10) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={isVisible ? "footer-nav" : "footer-nav hide"}>
      <div className="footer-nav-inner">
        <ul>
          <li>
            <FcShop />
            <span>사이트 거래</span>
          </li>
          <li>
            <FcBarChart />
            <span>사업 투자</span>
          </li>
          <li
            onClick={() => {
              router.push("/");
            }}
          >
            <FcHome />
            <span>홈</span>
          </li>

          <li>
            <FcComments />
            <span>커뮤니티</span>
          </li>
          <li
            onClick={() => {
              router.push("/mypage");
            }}
          >
            <FcAbout />
            <span>마이페이지</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
