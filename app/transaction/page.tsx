"use client";

import { useRouter } from "next/navigation";

function page() {
  let router = useRouter();

  return (
    <div className="transaction-inner">
      <div className="transaction-biz">
        <div
          className="buy biz-box"
          onClick={() => router.push("/transaction/buy", { scroll: true })}
        >
          <p>사업자 구매하기</p>
        </div>
        <div
          className="sell biz-box"
          onClick={() => {
            router.push("/transaction/sell", { scroll: false });
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 100);
          }}
        >
          <p>사업자 판매하기</p>
        </div>
      </div>
    </div>
  );
}

export default page;
