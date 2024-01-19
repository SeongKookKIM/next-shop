"use client";

import { LuSearch, LuLayoutList } from "react-icons/lu";

function buy() {
  return (
    <div className="buy">
      <strong>사업자 구매</strong>

      <div className="transaction-search-box">
        <LuSearch />
        <input type="text" name="search" placeholder="제목 및 상호 검색" />
        <LuLayoutList className="transaction-search-options" />
      </div>

      <div className="transaction-list">
        <ul>
          <li>
            <div className="transaction-list-logo">
              <img src="https://s3.ap-northeast-2.amazonaws.com/nextshopimage/logo/logo192.png" />
            </div>
            <div className="transaction-list-info">
              <p>타이틀</p>

              <p>
                월 수익:<span>1만원</span>
              </p>
              <p>
                월 매출:<span>1만원</span>
              </p>

              <p>타이틀</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default buy;
