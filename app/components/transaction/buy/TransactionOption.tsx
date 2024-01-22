"use client";

import { TransactionType } from "@/app/Type";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuXCircle } from "react-icons/lu";

interface TransactionOptionType {
  setTransactionOption: React.Dispatch<React.SetStateAction<boolean>>;
  setTransactionList: React.Dispatch<React.SetStateAction<TransactionType[]>>;
}

function TransactionOption({
  setTransactionOption,
  setTransactionList,
}: TransactionOptionType) {
  const [show, setShow] = useState<string>("");

  let router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    let bgShow = setTimeout(() => {
      setShow("show");
    }, 700);

    return () => {
      clearTimeout(bgShow);
      setShow("");
    };
  }, []);

  const handlerFilter = async (data: any) => {
    await new Promise((r) => setTimeout(r, 100));

    axios
      .post("/api/transaction/filter", data)
      .then((res) => {
        setTransactionList(res.data);
        setTransactionOption(false);
        document.querySelector("body")?.classList.remove("active");

        setTimeout(() => {
          router.refresh();
        }, 100);
      })
      .catch((err) => console.log(err));
  };

  const handlerReset = () => {
    setTransactionOption(false);
    document.querySelector("body")?.classList.remove("active");

    axios
      .post("/api/transaction/list")
      .then((res) => {
        setTransactionList(res.data);
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      router.refresh();
    }, 100);
  };

  return (
    <form
      className={`transaction-option-box ${show}`}
      onSubmit={handleSubmit(handlerFilter)}
    >
      <div className="transaction-header">
        <strong>전체 필터</strong>
        <LuXCircle
          onClick={() => {
            setTransactionOption(false);
            document.querySelector("body")?.classList.remove("active");
          }}
        />
      </div>
      <div className="transaction-body">
        <ul>
          <li>
            <label>판매 금액</label>

            <div className="price-box filter-box">
              <input
                type="number"
                placeholder="최소 금액"
                {...register("priceMin")}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="최대 금액"
                {...register("priceMax")}
              />
            </div>
            <span>*만원 단위 숫자만 입력해주세요.</span>
          </li>
          <li>
            <label>월 수익</label>

            <div className="sales-box filter-box">
              <input
                type="number"
                placeholder="최소 금액"
                {...register("salesMin")}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="최대 금액"
                {...register("salesMax")}
              />
            </div>
            <span>*만원 단위 숫자만 입력해주세요.</span>
          </li>
          <li>
            <label>월 매출</label>

            <div className="revenue-box filter-box">
              <input
                type="number"
                placeholder="최소 금액"
                {...register("revenueMin")}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="최대 금액"
                {...register("revenueMax")}
              />
            </div>
            <span>*만원 단위 숫자만 입력해주세요.</span>
          </li>
        </ul>
        <div className="transaction-footer">
          <span onClick={handlerReset}>초기화</span>
          <button type="submit" disabled={isSubmitting}>
            적용하기
          </button>
        </div>
      </div>
    </form>
  );
}

export default TransactionOption;
