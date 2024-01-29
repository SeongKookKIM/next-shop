"use client";

import DarkMode from "./DarkMode";
import HomeBiz from "./components/home/HomeBiz";
import HomeCommunity from "./components/home/HomeCommunity";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [scrollPos, setScrollPos] = useState<number>(0);
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);

  let router = useRouter();

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
    <div className="home">
      <div className={isNavVisible ? "m-nav" : "m-nav hide"}>
        <div className="m-nav-inner">
          <div className="m-logo">
            <h1>SHOP</h1>
          </div>
          <DarkMode />
        </div>
      </div>
      <div className="home-inner">
        <div className="home-title">
          <p>
            환영합니다
            <img
              src="https://nextshopimage.s3.ap-northeast-2.amazonaws.com/waving-hand.png"
              alt="hand-waving"
            />
          </p>
          <p>이제부터는 "직거래"를 통한 </p>
          <p>사업 양도 및 새로운 사업을 찾아보세요!</p>
        </div>

        <div className="home-biz-wrapper">
          <HomeBiz
            name="biz-transaction"
            title="사업자 거래"
            fdescription="쇼핑몰, 솔루션, 어플 등"
            sdescription="사업자 구매 또는 판매"
          />
          <HomeBiz
            name="biz-invest"
            title="사업 투자"
            fdescription="개인사업부터 중소기업"
            sdescription="투자 또는 펀딩받기"
          />
        </div>

        <div className="home-transaction-link">
          <div className="transaction-title">
            <span>한땀한땀 키운 내사업, </span>
            <span>간편하게 양도해 보세요.</span>
          </div>
          <div
            className="transaction-btn"
            onClick={() => {
              router.push("/transaction");
            }}
          >
            <p>사업 직거래하기</p>
          </div>
        </div>

        {/* 커뮤니티 */}
        <SWRConfig
          value={{
            fetcher: (url: string) => axios.post(url).then((res) => res.data),
          }}
        >
          <HomeCommunity />
        </SWRConfig>
      </div>
    </div>
  );
}
