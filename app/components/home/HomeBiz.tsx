"use client";
import { useRouter } from "next/navigation";
import { FcSynchronize, FcAreaChart } from "react-icons/fc";

interface BizPropsType {
  name: string;
  title: string;
  fdescription: string;
  sdescription: string;
}

function HomeBiz({ name, title, fdescription, sdescription }: BizPropsType) {
  let router = useRouter();

  const handlerHref = (title: string) => {
    switch (title) {
      case "사업자 거래":
        router.push("/transaction", { scroll: true });
        return;

      case "사업 투자":
        router.push("/", { scroll: true });
        return;
    }
  };

  return (
    <div
      className={`${name} biz`}
      onClick={() => {
        handlerHref(title);
      }}
    >
      <p>{title}</p>
      <span>{fdescription}</span>
      <span>{sdescription}</span>
      <div className="biz-image">
        {name === "biz-transaction" ? <FcSynchronize /> : <FcAreaChart />}
      </div>
    </div>
  );
}

export default HomeBiz;
