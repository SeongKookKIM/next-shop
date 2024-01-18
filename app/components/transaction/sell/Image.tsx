"use client";

import React, { MutableRefObject, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { LuPlus } from "react-icons/lu";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface ImagePorpsType {
  imageRef: MutableRefObject<HTMLInputElement | null>;
  previewImage: string[];
}

function Image({ imageRef, previewImage }: ImagePorpsType) {
  return (
    <div className="transaction-image-slide">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="transaction-image-swiper"
      >
        {previewImage.length > 0 && (
          <>
            {previewImage.map((it, idx) => {
              return (
                <SwiperSlide className="add-image-list" key={idx}>
                  <img src={it} />
                </SwiperSlide>
              );
            })}
          </>
        )}
        <SwiperSlide
          className="add-image"
          onClick={() => imageRef.current?.click()}
        >
          <LuPlus />
          <span>이미지 추가하기</span>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Image;
