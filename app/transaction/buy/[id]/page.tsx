"use client";

import Slide from "@/app/components/transaction/buy/Slide";
import { useParams, useSearchParams } from "next/navigation";

function page() {
  const a = useParams();

  console.log(a);

  return (
    <div className="transaction-detail">
      <Slide />
      <div className="transaction-post-header">
        <strong className="title">타이틀</strong>
        <span className="date"></span>
        <p className="price">1,000 만원</p>
        <div className="price-info-box">
          <ul>
            <li className="sales">
              <p>월 매출</p>
              <span>1,000만원</span>
            </li>
            <li className="revenue">
              <p>월 수익</p>
              <span>1,000만원</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="transaction-post-body">
        <strong>사이트정보</strong>
        <div className="shop-logo">
          <h6>로고</h6>
          <img src="https://s3.ap-northeast-2.amazonaws.com/nextshopimage/logo/logo512.png" />
        </div>
        <div className="shop-name">
          <h6>상호</h6>
          <p>Test</p>
        </div>
        <div className="shop-url">
          <h6>URL</h6>
          <p>www.1234.com</p>
        </div>
      </div>

      <div className="transaction-post-content">
        <h6>상세 설명</h6>
        ㅁㄴㅇㅁㄴㅇㅁㄴㅇ
      </div>

      <div className="transaction-post-footer">
        <strong>판매자 정보</strong>
        <div className="shop-user-name">
          <h6>판매자 이름</h6>
          <p>김성국</p>
        </div>
        <div className="shop-user-phone">
          <h6>판매자 연락처</h6>
          <p>01012341234</p>
        </div>
        <div className="shop-user-email">
          <h6>판매자 이베일</h6>
          <p>tjdrnr2969@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default page;
