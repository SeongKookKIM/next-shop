import { FcSynchronize, FcAreaChart } from "react-icons/fc";

interface BizPropsType {
  name: string;
  title: string;
  fdescription: string;
  sdescription: string;
}

function HomeBiz({ name, title, fdescription, sdescription }: BizPropsType) {
  return (
    <div className={`${name} biz`}>
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
