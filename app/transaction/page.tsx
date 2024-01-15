"use client";

import { useRouter } from "next/navigation";

function page() {
  let router = useRouter();

  return (
    <div className="transaction-inner">
      <div className="transaction-biz">
        <div className="buy biz-box">
          <p>사업자 구매하기</p>
        </div>
        <div
          className="sell biz-box"
          onClick={() => router.push("/transaction/sell")}
        >
          <p>사업자 판매하기</p>
        </div>
      </div>
    </div>
  );
}

export default page;