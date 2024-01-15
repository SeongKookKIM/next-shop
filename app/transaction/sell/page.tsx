"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

function page() {
  const [image, setImage] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string[]>([]);

  const imageRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const handlerSell = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));
  };

  return (
    <div className="sell">
      <strong>사업자 판매</strong>
      <form onSubmit={handleSubmit(handlerSell)}>
        <div className="add-image sell-box">
          <label>이미지</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            multiple={false}
            ref={imageRef}
          />
        </div>
      </form>
    </div>
  );
}

export default page;
