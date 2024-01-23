"use client";

import { TransactionType } from "@/app/Type";
import Slide from "@/app/components/transaction/buy/Slide";
import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type PostType = {
  id: string;
};

function page() {
  const postId: PostType | null = useParams();

  const [postDetail, setPostDetail] = useState<TransactionType | undefined>();

  const [moreSee, setMoreSee] = useState<boolean>(false);

  useEffect(() => {
    axios
      .post("/api/transaction/detail", { _id: postId?.id })
      .then((res) => {
        setPostDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, [postId]);

  const handlerClickUrl = (url: string) => {
    const absoluteUrl = url.startsWith("http") ? url : `http://${url}`;
    window.open(absoluteUrl, "_blank");
  };

  const hanlderCopy = async (copy: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = copy;
    document.body.appendChild(textarea);
    textarea.select();

    try {
      await navigator.clipboard.writeText(copy);
      alert("클립보드에 복사되었습니다.");
    } catch (e) {
      alert("복사에 실패하였습니다");
    }

    document.body.removeChild(textarea);
  };

  if (!postDetail) {
    return <div className="load">Loading...</div>;
  }

  return (
    <div className="transaction-detail">
      <Slide postImage={postDetail?.image} />
      <div className="transaction-post-header">
        <strong className="title">{postDetail?.title}</strong>
        <p className="price">
          판매가: {postDetail.price.toLocaleString()} 만원
        </p>
        <div className="price-info-box">
          <ul>
            <li className="sales">
              <p>월 매출</p>
              <span>{postDetail.sales.toLocaleString()}만원</span>
            </li>
            <li className="revenue">
              <p>월 수익</p>
              <span>{postDetail.revenue.toLocaleString()}만원</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="transaction-post-body">
        <strong>사이트정보</strong>
        <div className="shop-logo">
          <h6>로고</h6>
          <img src={postDetail.logo} />
        </div>
        <div className="shop-name">
          <h6>상호</h6>
          <p>{postDetail.shopName}</p>
        </div>
        <div className="shop-url">
          <h6>URL</h6>
          <p
            onClick={() => {
              handlerClickUrl(postDetail.url);
            }}
          >
            {postDetail.url}
          </p>
        </div>
      </div>

      <div className="transaction-post-content">
        <strong>상세 설명</strong>
        <div
          className={
            moreSee
              ? "transaction-post-content-wrapper show"
              : "transaction-post-content-wrapper"
          }
        >
          <Viewer initialValue={postDetail.content} />
        </div>
        <button
          type="button"
          className="more-see-btn"
          onClick={() => setMoreSee(!moreSee)}
        >
          {moreSee ? "접기" : "설명 더 보기"}
        </button>
      </div>

      <div className="transaction-post-footer">
        <strong>판매자 정보</strong>
        <div className="shop-user-name">
          <h6>이름</h6>
          <p>{postDetail.name}</p>
        </div>
        <div className="shop-user-phone">
          <h6>연락처</h6>
          <p>
            {postDetail.phone}
            <span
              onClick={() => {
                {
                  hanlderCopy(postDetail.phone);
                }
              }}
            >
              복사하기
            </span>
          </p>
        </div>
        <div className="shop-user-email">
          <h6>이메일</h6>
          <p>
            {postDetail.email}
            <span
              onClick={() => {
                {
                  hanlderCopy(postDetail.email);
                }
              }}
            >
              복사하기
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
