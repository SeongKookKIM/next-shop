import { CommnunityPostType } from "@/app/Type";
import Link from "next/link";
import { FcVoicePresentation } from "react-icons/fc";

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
                  <Link prefetch={true} href={`/community/${list._id}`}>
                    <strong className="community-list-title">
                      {list.title}
                    </strong>
                    <div className="community-list-info">
                      <span>{list.type}</span>
                      <span>·</span>
                      <span>{list.userName}</span>
                      <span>·</span>
                      <div className="comment">
                        <FcVoicePresentation />
                        <span>{list.count}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </>
        ) : (
          <div className="no-community">
            <span>게시물이 존재하지 않습니다.</span>
          </div>
        )}
      </ul>
    </div>
  );
}

export default List;
