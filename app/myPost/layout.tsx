import SubNav from "../components/SubNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-post-page">
      <SubNav title={"내 사업 매물"} />
      {children}
    </div>
  );
}
