import SubNav from "../components/SubNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-write-page">
      <SubNav title={"내가 쓴 글"} />
      {children}
    </div>
  );
}
