import SubNav from "../components/mypage/SubNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-page">
      <SubNav />
      {children}
    </div>
  );
}
