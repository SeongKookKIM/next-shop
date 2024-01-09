import SubNav from "../components/SubNav";
import WriteBtn from "../components/community/WriteBtn";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="community-page">
      <SubNav title={"커뮤니티"} />
      {children}
      <WriteBtn />
    </div>
  );
}
