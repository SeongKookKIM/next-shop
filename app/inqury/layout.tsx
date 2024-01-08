import SubNav from "../components/SubNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="inqury-page">
      <SubNav title={"문의하기"} />

      {children}
    </div>
  );
}
