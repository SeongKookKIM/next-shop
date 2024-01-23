"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

interface PostDetailPropsType {
  postImage: string[] | undefined;
}

function Slide({ postImage }: PostDetailPropsType) {
  return (
    <div>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination]}
        className="transaction-detail-slide"
      >
        {postImage && postImage.length > 0 ? (
          <>
            {postImage.map((post, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <img src={post} />
                </SwiperSlide>
              );
            })}
          </>
        ) : (
          <SwiperSlide>
            <p>이미지가 존재하지 않습니다.</p>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}

export default Slide;
