import SubNav from "../components/SubNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="login-page">
      <SubNav title="로그인" />
      {children}
    </div>
  );
}
