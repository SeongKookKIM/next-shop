import SubNav from "../components/SubNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="community-write-page">
      <SubNav title={"글쓰기"} />
      {children}
    </div>
  );
}
