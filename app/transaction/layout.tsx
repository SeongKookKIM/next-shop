import { getServerSession } from "next-auth";
import SubNav from "../components/SubNav";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="transaction-page">
      <SubNav title={"사업자 거래"} />
      {children}
    </div>
  );
}
