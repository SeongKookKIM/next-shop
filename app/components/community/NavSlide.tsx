"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import { useState } from "react";
import { useRouter } from "next/navigation";

function NavSlide() {
  const [tab, setTab] = useState<number>(0);
  const communityTitle: string[] = [
    "자유게시판",
    "사업직거래 후기",
    "구인·구직",
    "Q&A",
    "유머·HOT",
  ];

  let router = useRouter();

  const handlerClickTab = (title: string, index: number) => {
    setTab(index);

    switch (title) {
      case "자유게시판":
        router.push("/community");
        break;
      case "사업직거래 후기":
        router.push("/community/review");
        break;
      case "구인·구직":
        router.push("/community/offer");
        break;
      case "Q&A":
        router.push("/community/qa");
        break;
      case "유머·HOT":
        router.push("/community/hot");
        break;
    }
  };

  return (
    <div className="nav-swiper">
      <Swiper
        slidesPerView={3.9}
        spaceBetween={0}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode]}
        className="mySwiper"
      >
        {communityTitle.map((title, i) => {
          return (
            <SwiperSlide
              key={i}
              onClick={() => {
                handlerClickTab(title, i);
              }}
            >
              <span className={i === tab ? "active" : ""}>{title}</span>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default NavSlide;
