"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { LuPlus, LuRefreshCcw } from "react-icons/lu";

import Image from "@/app/components/transaction/sell/Image";
import Content from "@/app/components/transaction/sell/Content";

function page() {
  const [image, setImage] = useState<string[]>([]);
  const [imageFileName, setImageFileName] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string[]>([]);

  const [logoSrc, setLogoSrc] = useState<string>("");
  const [logofile, setLogofile] = useState<string>("");
  const [previewLogo, setPreviewLogo] = useState<string>("");

  const imageRef = useRef<HTMLInputElement | null>(null);
  const logoRef = useRef<HTMLInputElement | null>(null);

  const contentRef = useRef<any>(null);

  let router = useRouter();

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

  // RefreshImage
  const handlerImageReset = () => {
    setImage([]);
    setImageFileName([]);
    setPreviewImage([]);

    window.location.reload();

    setTimeout(() => {
      router.refresh();
    }, 100);
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

    const contentIns = contentRef?.current?.getInstance();

    const contentMark = contentIns.getMarkdown();

    if (window.confirm("판매 등록하시겠습니까?")) {
      const handlerAwsImage = async () => {
        // Image
        let formArray: any;
        const awsUrl: string[] = [];

        try {
          const res = await axios.post("/api/transaction/image", {
            image: imageFileName,
          });
          formArray = res.data;

          if (formArray && formArray.length > 0) {
            for (let i = 0; i < formArray.length; i++) {
              const formData = new FormData();
              Object.entries({
                ...formArray[i].fields,
                file: image[i],
              }).forEach(([key, value]) => {
                formData.append(key, value as string);
              });

              let result = await fetch(formArray[i].url, {
                method: "POST",
                body: formData,
              });

              if (result.ok) {
                // AWS S3 Image 이미지 주소
                awsUrl.push(`${result.url}/transaction/${imageFileName[i]}`);
              } else {
                alert("이미지 업로드 실패");
              }
            }
          }
        } catch (err) {
          throw err;
        }

        return awsUrl;
      };

      const handlerAwsLogo = async () => {
        // Logo
        let logoUrl: string;

        try {
          let logoResult = await fetch(
            "/api/transaction/logo?file=" + logoSrc
          ).then((r) => r.json());

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

          if (logoUpload.ok) {
            // AWS S3 Logo 이미지 주소
            logoUrl = `${logoUpload.url}/logo/${logoSrc}`;
          } else {
            alert("로고 이미지 업로드 실패");
            throw new Error("로고 이미지 업로드 실패");
          }
        } catch (err) {
          throw err;
        }

        return logoUrl;
      };

      try {
        const [awsUrl, logoUrl] = await Promise.all([
          handlerAwsImage(),
          handlerAwsLogo(),
        ]);

        const postDbData = {
          userName: "",
          userId: "",
          image: awsUrl,
          logo: logoUrl,
          title: data.title,
          shopName: data.shopName,
          url: data.url,
          price: parseInt(data.price),
          sales: parseInt(data.sales),
          revenue: parseInt(data.revenue),
          content: contentMark,
          name: data.name,
          phone: data.phone,
          email: data.email,
          date: new Date(),
        };

        await axios
          .post("/api/transaction/add", postDbData)
          .then((res) => {
            alert(res.data);
            router.push("/transaction");
            router.refresh();
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
        alert("이미지 및 로고 처리 중 오류 발생");
      }
    } else {
      return;
    }
  };

  return (
    <div className="sell">
      <strong>사업자 판매</strong>
      <form onSubmit={handleSubmit(handlerSell)}>
        {/* 이미지 저장 */}
        <div className="add-image sell-box">
          <label>
            이미지 {"("}1MB이하의 파일만 올려주세요.{")"}
            <span onClick={handlerImageReset}>
              <LuRefreshCcw />
            </span>
          </label>
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

        {/* 제목 */}
        <div className="sell-box">
          <label>
            제목{" "}
            {errors.title && (
              <p className="alert">{errors.title.message?.toString()}</p>
            )}
          </label>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            autoComplete="off"
            aria-invalid={
              isSubmitted ? (errors.title ? "true" : "false") : undefined
            }
            {...register("title", {
              required: "* 필수 입력란입니다.",
            })}
          />
        </div>

        {/* 상호 */}
        <div className="sell-box">
          <label>
            상호{" "}
            {errors.shopName && (
              <p className="alert">{errors.shopName.message?.toString()}</p>
            )}
          </label>
          <input
            type="text"
            placeholder="상호를 입력해주세요."
            autoComplete="off"
            aria-invalid={
              isSubmitted ? (errors.shopName ? "true" : "false") : undefined
            }
            {...register("shopName", {
              required: "* 필수 입력란입니다.",
            })}
          />
        </div>

        {/* 로고 */}
        <div className="logo-box sell-box">
          <label>
            로고 등록 {"("}1MB이하의 파일만 올려주세요.{")"}
          </label>
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

        {/* URL */}
        <div className="sell-box">
          <label>
            URL{" "}
            {errors.url && (
              <p className="alert">{errors.url.message?.toString()}</p>
            )}
          </label>
          <input
            type="text"
            placeholder="URL을 입력해주세요."
            autoComplete="off"
            aria-invalid={
              isSubmitted ? (errors.url ? "true" : "false") : undefined
            }
            {...register("url", {
              required: "* 필수 입력란입니다.",
            })}
          />
        </div>

        {/* 가격 */}
        <div className="sell-box">
          <label>
            판매 가격{" "}
            {errors.price && (
              <p className="alert">{errors.price.message?.toString()}</p>
            )}
          </label>
          <div className="number-box">
            <input
              type="number"
              placeholder="숫자만 입력해주세요."
              autoComplete="off"
              aria-invalid={
                isSubmitted ? (errors.price ? "true" : "false") : undefined
              }
              {...register("price", {
                required: "* 필수 입력란입니다.",
              })}
            />
            <span>만원</span>
          </div>
        </div>

        {/* 월매출 */}
        <div className="sell-box">
          <label>
            월매출{" "}
            {errors.sales && (
              <p className="alert">{errors.sales.message?.toString()}</p>
            )}
          </label>
          <div className="number-box">
            <input
              type="number"
              placeholder="숫자만 입력해주세요."
              autoComplete="off"
              aria-invalid={
                isSubmitted ? (errors.sales ? "true" : "false") : undefined
              }
              {...register("sales", {
                required: "* 필수 입력란입니다.",
              })}
            />
            <span>만원</span>
          </div>
        </div>

        {/* 월수익 */}
        <div className="sell-box">
          <label>
            월수익{" "}
            {errors.revenue && (
              <p className="alert">{errors.revenue.message?.toString()}</p>
            )}
          </label>
          <div className="number-box">
            <input
              type="number"
              placeholder="숫자만 입력해주세요."
              autoComplete="off"
              aria-invalid={
                isSubmitted ? (errors.revenue ? "true" : "false") : undefined
              }
              {...register("revenue", {
                required: "* 필수 입력란입니다.",
              })}
            />
            <span>만원</span>
          </div>
        </div>

        {/* 상세내용 */}
        <div className="sell-box">
          <label>상세내용</label>
          <Content contentRef={contentRef} content="" />
        </div>

        {/* 판매자 정보 */}
        <strong>판매자 정보</strong>

        {/* 이름 */}
        <div className="sell-box">
          <label>
            판매자 이름{" "}
            {errors.name && (
              <p className="alert">{errors.name.message?.toString()}</p>
            )}
          </label>
          <input
            type="text"
            placeholder="판매자 성함을 입력해주세요."
            autoComplete="off"
            aria-invalid={
              isSubmitted ? (errors.name ? "true" : "false") : undefined
            }
            {...register("name", {
              required: "* 필수 입력란입니다.",
            })}
          />
        </div>

        {/* 연락처 */}
        <div className="sell-box">
          <label>
            판매자 연락처{" "}
            {errors.phone && (
              <p className="alert">{errors.phone.message?.toString()}</p>
            )}
          </label>
          <input
            type="number"
            placeholder="- 제외하고 숫자만 입력해주세요."
            autoComplete="off"
            aria-invalid={
              isSubmitted ? (errors.phone ? "true" : "false") : undefined
            }
            {...register("phone", {
              required: "* 필수 입력란입니다.",
              pattern: {
                value: /^[0-9]*$/,
                message: "* 올바른 핸드폰 번호를 입력해주세요.",
              },
              maxLength: {
                value: 11,
                message: "* 최대 11자리까지 입력 가능합니다.",
              },
            })}
          />
        </div>

        {/* 이메일 */}
        <div className="sell-box">
          <label>
            판매자 이메일{" "}
            {errors.email && (
              <p className="alert">{errors.email.message?.toString()}</p>
            )}
          </label>
          <input
            type="text"
            placeholder="올바른 이메일을 입력해주세요."
            autoComplete="off"
            aria-invalid={
              isSubmitted ? (errors.email ? "true" : "false") : undefined
            }
            {...register("email", {
              required: "* 필수 입력란입니다.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "* 올바른 이메일 주소를 입력하세요.",
              },
            })}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="transaction-sell-btn"
        >
          판매등록
        </button>
      </form>
    </div>
  );
}

export default page;
