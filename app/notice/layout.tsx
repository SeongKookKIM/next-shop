import SubNav from "../components/SubNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="notice-page">
      <SubNav title={"공지사항"} />
      {children}
    </div>
  );
}
