import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { LuUser, LuChevronRight } from "react-icons/lu";
import LogoutBtn from "./LogoutBtn";

async function page() {
  let session = await getServerSession(authOptions);

  return (
    <div className="mypage-inner">
      <div className="profile">
        <div className="profile-image">
          {session?.user?.image ? (
            <img src={session.user.image} alt="image" />
          ) : (
            <LuUser />
          )}
        </div>
        <div className="profile-info">
          <p>
            {session?.user?.name
              ? session?.user?.name
              : session?.user?.nickName}
          </p>
          <span>{session?.user?.email}</span>
          <LuChevronRight className="profile-click" />
        </div>
      </div>
      <div className="business-box">
        <ul>
          <li>
            <span>내 사업 판매하기</span>
          </li>
          <li>
            <span>내 사업 매물</span>
          </li>
        </ul>
      </div>
      <div className="profile-box">
        <ul>
          <li>
            <span>내가 쓴 글</span>
          </li>
          <li>
            <span>회원정보 수정</span>
          </li>
          <li>
            <span>공지사항</span>
          </li>
          <li>
            <span>문의하기</span>
          </li>
        </ul>
      </div>
      <LogoutBtn />
    </div>
  );
}

export default page;
