"use client";

import React, { useEffect, useState } from "react";
import { TransactionType } from "../Type";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ObjectId } from "mongodb";

function page() {
  const [transactionList, setTransactionList] = useState<TransactionType[]>([]);
  const [postShowNum, setPostShowNum] = useState<number>(5);

  let router = useRouter();

  useEffect(() => {
    axios
      .post("/api/myPost/find")
      .then((res) => {
        setTransactionList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlerPostDelete = (id: ObjectId) => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      axios
        .post("/api/myPost/delete", { _id: id })
        .then((res) => {
          alert(res.data);
          window.location.reload();
          setTimeout(() => {
            router.refresh();
          }, 100);
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  return (
    <div className="my-post-page-inner">
      <div className="transaction-list">
        <ul>
          {transactionList && transactionList.length > 0 ? (
            <>
              {transactionList.slice(0, postShowNum).map((post, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <li
                      onClick={() => {
                        router.prefetch(`/transaction/buy/${post._id}`);
                        setTimeout(() => {
                          router.push(`/transaction/buy/${post._id}`);
                        }, 100);
                      }}
                    >
                      <div className="transaction-list-logo">
                        {post.logo ===
                        "https://s3.ap-northeast-2.amazonaws.com/nextshopimage/logo/" ? (
                          <h6>SHOP</h6>
                        ) : (
                          <img src={post.logo} />
                        )}
                      </div>
                      <div className="transaction-list-info">
                        <p>{post.title}</p>

                        <p className="transaction-list-info-sales">
                          월 수익:
                          <span> {post.sales.toLocaleString()}만원</span>
                        </p>
                        <p className="transaction-list-info-revenue">
                          월 매출:
                          <span> {post.revenue.toLocaleString()}만원</span>
                        </p>

                        <p className="transaction-list-info-price">
                          판매가: {post.price.toLocaleString()}만원
                        </p>
                      </div>
                    </li>
                    <div className="btn-box">
                      <span>수정하기</span>
                      <span
                        onClick={() => {
                          handlerPostDelete(post._id);
                        }}
                      >
                        삭제하기
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            <div className="no-post"> 상품이 존재하지 않습니다.</div>
          )}
        </ul>
      </div>

      {postShowNum < transactionList.length ? (
        <button
          type="button"
          className="transaction-list-more"
          onClick={() => {
            setPostShowNum((prev: number) => prev + 5);
          }}
        >
          더 보기
        </button>
      ) : (
        <button
          type="button"
          className="transaction-list-more"
          onClick={() => alert("더 이상 상품이 존재하지 않습니다.")}
        >
          더 보기
        </button>
      )}
    </div>
  );
}

export default page;
