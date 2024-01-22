"use client";

import { TransactionType } from "@/app/Type";
import TransactionOption from "@/app/components/transaction/buy/TransactionOption";
import Bg from "@/app/components/transaction/buy/bg";
import axios from "axios";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useState } from "react";
import { LuSearch, LuLayoutList } from "react-icons/lu";

function buy() {
  const [transactionList, setTransactionList] = useState<TransactionType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [postShowNum, setPostShowNum] = useState<number>(5);

  const [transactionOption, setTransactionOption] = useState<boolean>(false);

  let router = useRouter();

  useEffect(() => {
    axios
      .post("/api/transaction/list")
      .then((res) => {
        setTransactionList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlerSearchEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      axios
        .post("/api/transaction/search", { value: searchValue })
        .then((res) => {
          setTransactionList(res.data);
          setPostShowNum(5);
          setTimeout(() => {
            router.refresh();
          }, 100);
        })
        .catch((err) => console.log(err));
    }
  };

  const handlerClickEnter = () => {
    axios
      .post("/api/transaction/search", { value: searchValue })
      .then((res) => {
        setTransactionList(res.data);
        setPostShowNum(5);
        setTimeout(() => {
          router.refresh();
        }, 100);
      })
      .catch((err) => console.log(err));
  };

  const handlerOption = () => {
    setTransactionOption(true);
    document.querySelector("body")?.classList.add("active");
  };

  return (
    <div className="buy">
      <strong>
        사업자 구매{" "}
        <LuLayoutList
          className="transaction-search-options"
          onClick={handlerOption}
        />
      </strong>

      <div className="transaction-search-box">
        <LuSearch className="transaction-search-icons" />
        <input
          type="text"
          name="search"
          placeholder="제목 및 상호 검색"
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            handlerSearchEnter(e);
          }}
        />
        <span onClick={handlerClickEnter}>Enter</span>
      </div>

      <div className="transaction-list">
        <ul>
          {transactionList && transactionList.length > 0 ? (
            <>
              {transactionList.slice(0, postShowNum).map((post, idx) => {
                return (
                  <li key={idx}>
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
                        월 수익:<span> {post.sales.toLocaleString()}만원</span>
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
                );
              })}
            </>
          ) : (
            <div> 상품이 존재하지 않습니다.</div>
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

      {transactionOption && <Bg setTransactionOption={setTransactionOption} />}
      {transactionOption && (
        <TransactionOption
          setTransactionOption={setTransactionOption}
          setTransactionList={setTransactionList}
        />
      )}
    </div>
  );
}

export default buy;
