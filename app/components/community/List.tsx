"use client";

import { CommnunityPostType } from "@/app/Type";
import { LuMail } from "react-icons/lu";

interface ListPropsType {
  findList: CommnunityPostType[] | undefined;
}

function List({ findList }: ListPropsType) {
  return (
    <div className="community-inner">
      <ul className="community-list">
        {findList && findList.length > 0 ? (
          <>
            {findList.map((list, idx) => {
              return (
                <li key={idx}>
                  <strong className="community-list-title">{list.title}</strong>
                  <div className="community-list-info">
                    <span>{list.type}</span>
                    <span>·</span>
                    <span>{list.userName}</span>
                    <span>·</span>
                    <div className="comment">
                      <LuMail />
                      <span>{list.count}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}

export default List;
