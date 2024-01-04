import SubNav from "../components/SubNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mypage-page">
      <SubNav title={"마이페이지"} />
      {children}
    </div>
  );
}
