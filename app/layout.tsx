import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./Style.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sell Site",
  description: "사이트 판매 사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>nav 테스트</div>
        {children}
      </body>
    </html>
  );
}
