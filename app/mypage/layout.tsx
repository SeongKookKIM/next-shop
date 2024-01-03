import { getServerSession } from "next-auth";
import SubNav from "../components/SubNav";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await getServerSession(authOptions);
  if (session && session.user) {
    console.log(session.user.name);
    console.log(session.user.nickName);
  }

  return (
    <div className="myapge-page">
      <SubNav title={"마이페이지"} />
      {children}
    </div>
  );
}
