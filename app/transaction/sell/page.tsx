"use client";

import Image from "@/app/components/transaction/sell/Image";
import axios from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { LuPlus } from "react-icons/lu";

function page() {
  const [image, setImage] = useState<string[]>([]);
  const [imageFileName, setImageFileName] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string[]>([]);
  const [awsUrl, setAwsUrl] = useState<string[]>([]);

  const [logoSrc, setLogoSrc] = useState<string>("");
  const [logofile, setLogofile] = useState<string>("");
  const [previewLogo, setPreviewLogo] = useState<string>("");
  const [logoUrl, setLogoUrl] = useState<string>("");

  console.log(logoUrl);

  const imageRef = useRef<HTMLInputElement | null>(null);
  const logoRef = useRef<HTMLInputElement | null>(null);

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

  // LogoImage
  const handlerLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: any = e.target.files?.[0];

    if (file) {
      setLogofile(file);
      setValue("logo", file);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        let result = reader.result;

        if (typeof result === "string") {
          setPreviewLogo(result);
        }
      };

      let filename = encodeURIComponent(file.name);
      if (filename === undefined) {
        setLogoSrc("");
      } else {
        setLogoSrc(filename);
      }
    }
  };

  // Submit
  const handlerSell = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));

    // Image
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

        // AWS S3 Image 이미지 주소
        awsUrl.push(`${result.url}/transaction/${imageFileName[i]}`);
      }
    }

    // Logo
    let logoResult = await fetch("/api/transaction/logo?file=" + logoSrc).then(
      (r) => r.json()
    );

    const logoFormData = new FormData();
    Object.entries({ ...logoResult.fields, file: logofile }).forEach(
      ([key, value]) => {
        logoFormData.append(key, value as string);
      }
    );

    let logoUpload = await fetch(logoResult.url, {
      method: "POST",
      body: logoFormData,
    });

    if (logoUpload) {
      // AWS S3 Logo 이미지 주소
      setLogoUrl(`${logoUpload.url}/logo/${logoSrc}`);
    } else {
      alert("로고 이미지 업로드 실패");
    }
  };

  return (
    <div className="sell">
      <strong>사업자 판매</strong>
      <form onSubmit={handleSubmit(handlerSell)}>
        <div className="add-image sell-box">
          <label>이미지</label>
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
          <Image imageRef={imageRef} previewImage={previewImage} />
        </div>

        <div className="sell-box">
          <label>
            제목{" "}
            {errors.title && (
              <p className="alert">{errors.title.message?.toString()}</p>
            )}
          </label>
          <input
            type="text"
            aria-invalid={
              isSubmitted ? (errors.title ? "true" : "false") : undefined
            }
            {...register("title", {
              required: "* 필수 입력란입니다.",
            })}
          />
        </div>

        <div className="sell-box">
          <label>
            상호{" "}
            {errors.shopName && (
              <p className="alert">{errors.shopName.message?.toString()}</p>
            )}
          </label>
          <input
            type="text"
            aria-invalid={
              isSubmitted ? (errors.shopName ? "true" : "false") : undefined
            }
            {...register("shopName", {
              required: "* 필수 입력란입니다.",
            })}
          />
        </div>

        <div className="logo-box sell-box">
          <label>로고 등록</label>
          <input
            type="file"
            accept="image/*"
            multiple={false}
            ref={(e) => {
              register("logo");
              logoRef.current = e;
            }}
            onChange={(e) => {
              handlerLogo(e);
            }}
            hidden
          />
          <div className="logo-add" onClick={() => logoRef.current?.click()}>
            {previewLogo === "" ? <LuPlus /> : <img src={previewLogo} />}
          </div>
        </div>

        <button type="submit" disabled={isSubmitting}>
          판매등록
        </button>
      </form>
    </div>
  );
}

export default page;
