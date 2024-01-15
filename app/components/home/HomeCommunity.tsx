"use client";

import { CommnunityPostType } from "@/app/Type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcVoicePresentation } from "react-icons/fc";
import useSWR from "swr";

function HomeCommunity() {
  const { data, error } = useSWR<CommnunityPostType[]>("/api/home/community");

  let router = useRouter();

  return (
    <div className="home-community">
      <h3>
        커뮤니티
        <span onClick={() => router.push("/community")}>전체보기 {">"}</span>
      </h3>
      <ul>
        {data && (
          <>
            {data.map((it, i) => {
              return (
                <li key={i}>
                  <Link prefetch={true} href={`/community/${it._id}`}>
                    <p className="home-community-title">{it.title}</p>
                    <div className="home-community-info">
                      <span className="home-community-info-category">
                        {it.type}
                      </span>
                      <span>·</span>
                      <span className="home-community-info-nickname">
                        {it.userName}
                      </span>
                      <span>·</span>

                      <span className="home-community-info-count">
                        <FcVoicePresentation />
                        {it.count}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </>
        )}
      </ul>
      <div className="home-community-more-btn">
        <span onClick={() => router.push("/community")}>더보기</span>
      </div>
    </div>
  );
}

export default HomeCommunity;
