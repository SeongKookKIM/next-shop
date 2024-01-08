"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import InquryType from "../components/inqury/InquryType";
import Bg from "../components/inqury/Bg";
import axios from "axios";
import { useRouter } from "next/navigation";

function page() {
  const [inquryType, setInquryType] = useState<string>("");
  const [inquryTypeShow, setInquryTypeShow] = useState<boolean>(false);
  const [inquryTypeChecked, setInquryTypeChecked] = useState<boolean>(false);

  let router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const inquryRef = useRef<HTMLFormElement | null>(null);

  const handelerTypeSelected = () => {
    setInquryTypeShow(true);
    setInquryTypeChecked(true);
    document.querySelector("body")?.classList.add("active");
  };

  useEffect(() => {
    setValue("type", inquryType);
  }, [inquryType, setValue]);

  const inqurySubmit = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));

    if (inquryRef.current) {
      emailjs
        .sendForm(
          "service_zbgwd0t",
          "template_po12o6n",
          inquryRef.current,
          "NRzBPAzFKAGVNQ48J"
        )
        .then(
          (result) => {
            if (result.status === 200) {
              axios
                .post("/api/inqury/inqury", data)
                .then((res) => {
                  alert(res.data);
                  router.back();
                  router.refresh();
                })
                .catch((err) => console.log(err));
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  return (
    <div className="inqury-inner">
      <form ref={inquryRef} onSubmit={handleSubmit(inqurySubmit)}>
        <div
          className="inqury-type"
          onClick={() => {
            handelerTypeSelected();
          }}
        >
          <label>
            문의유형<span>*</span>
          </label>
          <input
            type="text"
            defaultValue={inquryType}
            placeholder="문의 유형을 선택해주세요.(클릭)"
            autoComplete="off"
            style={{ pointerEvents: "none" }}
            aria-invalid={
              isSubmitted ? (errors.type ? "true" : "false") : undefined
            }
            {...register("type", {
              required: "* 필수 입력란입니다.",
            })}
            className={inquryTypeChecked ? "inqury-type-input checked" : ""}
          />
          {errors.type && (
            <p className="alert">{errors.type.message?.toString()}</p>
          )}
        </div>

        <div className="inqury-name">
          <label>
            성함<span>*</span>
          </label>
          <input
            type="text"
            placeholder="문의자 성함을 입력해주세요."
            aria-invalid={
              isSubmitted ? (errors.name ? "true" : "false") : undefined
            }
            {...register("name", {
              required: "* 필수 입력란입니다.",
            })}
          />
          {errors.name && (
            <p className="alert">{errors.name.message?.toString()}</p>
          )}
        </div>

        <div className="inqury-email">
          <label>
            이메일<span>*</span>
          </label>
          <input
            type="text"
            placeholder="회신 받으실 이메일을 입력해주세요."
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
          {errors.email && (
            <p className="alert">{errors.email.message?.toString()}</p>
          )}
        </div>

        <div className="inqury-title">
          <label>
            제목<span>*</span>
          </label>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            aria-invalid={
              isSubmitted ? (errors.title ? "true" : "false") : undefined
            }
            {...register("title", {
              required: "* 필수 입력란입니다.",
            })}
          />
          {errors.title && (
            <p className="alert">{errors.title.message?.toString()}</p>
          )}
        </div>
        <div className="inqury-description">
          <label>
            내용<span>*</span>
          </label>
          <textarea
            typeof="text"
            placeholder="문의하실 내용을 입력해주세요."
            aria-invalid={
              isSubmitted ? (errors.description ? "true" : "false") : undefined
            }
            {...register("description", {
              required: "* 필수 입력란입니다.",
            })}
          ></textarea>
          {errors.description && (
            <p className="alert">{errors.description.message?.toString()}</p>
          )}
        </div>
        <input
          type="date"
          defaultValue={new Date().toISOString().split("T")[0]}
          {...register("date")}
          style={{ display: "none" }}
        />

        <button type="submit" disabled={isSubmitting}>
          작성완료
        </button>
      </form>
      {inquryTypeShow && (
        <Bg
          setInquryTypeShow={setInquryTypeShow}
          setInquryTypeChecked={setInquryTypeChecked}
        />
      )}
      {inquryTypeShow && (
        <InquryType
          setInquryTypeShow={setInquryTypeShow}
          setInquryTypeChecked={setInquryTypeChecked}
          setInquryType={setInquryType}
        />
      )}
    </div>
  );
}

export default page;
