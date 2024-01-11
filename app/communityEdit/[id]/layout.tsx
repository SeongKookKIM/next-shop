"use client";

import { SWRConfig } from "swr";
import SubNav from "../../components/SubNav";
import axios from "axios";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="community-write-page">
      <SubNav title={"글수정"} />
      <SWRConfig
        value={{
          fetcher: (url: string) => axios.post(url).then((res) => res.data),
        }}
      >
        {children}
      </SWRConfig>
    </div>
  );
}
