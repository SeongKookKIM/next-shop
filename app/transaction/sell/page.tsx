"use client";

import axios from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

function page() {
  const [image, setImage] = useState<string[]>([]);
  const [imageFileName, setImageFileName] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string[]>([]);
  const [awsUrl, setAwsUrl] = useState<string[]>([]);

  console.log(awsUrl);

  const imageRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  // FileImage
  const handlerImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];

    if (file) {
      image.push(file);
      setValue("image", file);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        let result = reader.result;

        if (typeof result === "string") {
          setPreviewImage([...previewImage, result]);
        }
      };

      let fileName = encodeURIComponent(file.name);
      imageFileName.push(fileName);
    }
  };

  // Submit
  const handlerSell = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));

    let formArray: any;

    await axios
      .post("/api/transaction/image", { image: imageFileName })
      .then((res) => {
        formArray = res.data;
      })
      .catch((err) => console.log(err));

    if (formArray && formArray.length > 0) {
      for (let i = 0; i < formArray.length; i++) {
        const formData = new FormData();
        Object.entries({ ...formArray[i].fields, file: image[i] }).forEach(
          ([key, value]) => {
            formData.append(key, value as string);
          }
        );

        let result = await fetch(formArray[i].url, {
          method: "POST",
          body: formData,
        });

        // AWS S3 이미지 주소
        awsUrl.push(`${result.url}/transaction/${imageFileName[i]}`);
      }
    }
  };

  return (
    <div className="sell">
      <strong>사업자 판매</strong>
      <form onSubmit={handleSubmit(handlerSell)}>
        <div className="add-image sell-box">
          <label>이미지</label>
          <p onClick={() => imageRef.current?.click()}>등록하기</p>
          <input
            type="file"
            accept="image/*"
            multiple={false}
            ref={(e) => {
              register("image");
              imageRef.current = e;
            }}
            onChange={(e) => {
              handlerImage(e);
            }}
            hidden
          />
        </div>

        <div className="img">
          {previewImage.map((it, i) => {
            return <img src={it} key={i} />;
          })}
        </div>

        <button type="submit" disabled={isSubmitting}>
          판매등록
        </button>
      </form>
    </div>
  );
}

export default page;
