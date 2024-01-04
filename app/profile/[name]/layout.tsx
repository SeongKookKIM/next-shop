import SubNav from "../../components/SubNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="profile-page">
      <SubNav title={"회원정보"} />
      {children}
    </div>
  );
}
