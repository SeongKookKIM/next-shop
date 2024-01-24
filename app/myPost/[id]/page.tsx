"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { LuPlus, LuRefreshCcw } from "react-icons/lu";

import Image from "@/app/components/transaction/sell/Image";
import Content from "@/app/components/transaction/sell/Content";
import { TransactionType } from "@/app/Type";

function page() {
  const [post, setPost] = useState<TransactionType>();

  const contentRef = useRef<any>(null);

  let router = useRouter();

  const state = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  useEffect(() => {
    axios
      .post("/api/myPost/postDetail", { _id: state?.id })
      .then((res) => {
        setPost(res.data);

        setValue("title", res.data.title);
        setValue("shopName", res.data.shopName);
        setValue("url", res.data.url);
        setValue("price", res.data.price);
        setValue("sales", res.data.sales);
        setValue("revenue", res.data.revenue);
        setValue("name", res.data.name);
        setValue("phone", res.data.phone);
        setValue("email", res.data.email);

        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 300);
      })
      .catch((err) => console.log(err));
  }, []);

  // RefreshImage
  const handlerImageReset = () => {
    window.location.reload();

    setTimeout(() => {
      router.refresh();
    }, 100);
  };

  // Submit
  const handlerSell = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));

    const contentIns = contentRef?.current?.getInstance();

    const contentMark = contentIns.getMarkdown();

    if (window.confirm("게시물을 수정하시겠습니까?")) {
      try {
        const postDbData = {
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
        };

        await axios
          .post(`/api/myPost/edit/?_id=${post?._id}`, postDbData)
          .then((res) => {
            alert(res.data);
            router.push("/myPost");

            setTimeout(() => {
              router.refresh();
            }, 100);
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
      <strong>사업자 매물 수정하기</strong>
      <form onSubmit={handleSubmit(handlerSell)}>
        {/* 이미지 저장 */}
        <div className="add-image sell-box">
          <label>
            이미지 {"("}* 이미지 수정은 게시물 삭제 후 재등록 하여주세요.{")"}
            <span onClick={handlerImageReset}>
              <LuRefreshCcw />
            </span>
          </label>
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
            defaultValue={post?.title}
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
            defaultValue={post?.shopName}
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
            로고 등록 {"("}* 로고 수정은 게시물 삭제 후 재등록 하여주세요.{")"}
          </label>
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
            defaultValue={post?.url}
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
              defaultValue={post?.price}
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
              defaultValue={post?.sales}
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
              defaultValue={post?.revenue}
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
          <Content contentRef={contentRef} content={post?.content} />
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
            defaultValue={post?.name}
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
            defaultValue={post?.phone}
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
            defaultValue={post?.email}
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
          게시물 수정하기
        </button>
      </form>
    </div>
  );
}

export default page;
