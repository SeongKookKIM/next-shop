import SubNav from "../components/SubNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="invest-page">
      <SubNav title={"사업 투자"} />
      {children}
    </div>
  );
}
