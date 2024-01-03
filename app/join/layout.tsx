import SubNav from "../components/SubNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="join-page">
      <SubNav title="회원가입" />
      {children}
    </div>
  );
}
