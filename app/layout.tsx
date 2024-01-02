import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./Style.scss";
import FooterNav from "./FooterNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Shop",
  description: "사이트 판매 사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let cookieRes = cookies().get("mode");

  return (
    <html lang="en">
      <body
        className={
          cookieRes != undefined && cookieRes.value == "dark" ? "dark-mode" : ""
        }
      >
        {children}
        <FooterNav />
      </body>
    </html>
  );
}
