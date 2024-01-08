import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { LuUser } from "react-icons/lu";
import LogoutBtn from "./LogoutBtn";
import ProfileInfo from "../components/mypage/ProfileInfo";
import Li from "../components/mypage/Li";

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
        <ProfileInfo session={session} />
      </div>
      <div className="business-box">
        <ul>
          <Li title={"내 사업 판매하기"} session={session} />
          <Li title={"내 사업 매물"} session={session} />
        </ul>
      </div>
      <div className="profile-box">
        <ul>
          <Li title={"내가 쓴 글"} session={session} />

          <Li title={"회원정보 수정"} session={session} />

          <Li title={"공지사항"} session={session} />

          <Li title={"문의하기"} session={session} />
        </ul>
      </div>
      <LogoutBtn />
    </div>
  );
}

export default page;
