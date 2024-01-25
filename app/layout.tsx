import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./Style.scss";
import FooterNav from "./FooterNav";
import Footer from "./components/footer/Footer";

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
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </Head>
      <body
        className={
          cookieRes != undefined && cookieRes.value == "dark" ? "dark-mode" : ""
        }
      >
        {children}
        <FooterNav />
        <Footer />
      </body>
    </html>
  );
}
