"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { LuEye, LuEyeOff } from "react-icons/lu";

function page() {
  const [passwordType, setPasswordType] = useState<string>("password");
  const [confirmPasswordType, setConfirmPasswordType] =
    useState<string>("password");

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const password = watch("password", "");

  let router = useRouter();

  const joinFormSubmit = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));

    axios
      .post("/api/auth/join", data)
      .then((res) => {
        if (res.status === 201) {
          alert(res.data);
        } else {
          alert(res.data);
          router.push("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="join">
      <div className="join-inner">
        <form onSubmit={handleSubmit(joinFormSubmit)}>
          {/* 아이디 */}
          <div className="user-id">
            <label>
              아이디<span>*</span>
            </label>
            <input
              type="text"
              placeholder="영어와 숫자를 포함하여 주세요."
              aria-invalid={
                isSubmitted ? (errors.id ? "true" : "false") : undefined
              }
              {...register("id", {
                required: "* 필수 입력란입니다.",
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/,
                  message: "* 영어와 숫자를 포함한 아이디를 입력해주세요.",
                },
              })}
            />
            {errors.id && (
              <p className="join-alert">{errors.id.message?.toString()}</p>
            )}
          </div>
          {/* 이메일 */}
          <div className="user-email">
            <label>
              이메일<span>*</span>
            </label>
            <input
              type="text"
              placeholder="이메일을 입력해주세요."
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
              <p className="join-alert">
                {errors.email.message?.toString() ?? ""}
              </p>
            )}
          </div>
          {/* 패스워드 */}
          <div className="user-password">
            <label>
              비밀번호<span>*</span>
            </label>
            <div className="user-password-wrapper">
              <input
                type={passwordType}
                placeholder="숫자+영문자+특수문자 조합으로 8자리 이상"
                aria-invalid={
                  isSubmitted ? (errors.password ? "true" : "false") : undefined
                }
                {...register("password", {
                  required: "* 필수 입력란입니다.",
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                    message:
                      "* 숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.",
                  },
                })}
              />
              {passwordType === "password" ? (
                <LuEye onClick={() => setPasswordType("text")} />
              ) : (
                <LuEyeOff onClick={() => setPasswordType("password")} />
              )}
            </div>
            {errors.password && (
              <p className="join-alert">
                {errors.password.message?.toString() ?? ""}
              </p>
            )}

            <div className="user-confirm-password-wrapper">
              <input
                type={confirmPasswordType}
                placeholder="비밀번호를 확인해주세요."
                aria-invalid={
                  isSubmitted
                    ? errors.confirmPassword
                      ? "true"
                      : "false"
                    : undefined
                }
                {...register("confirmPassword", {
                  required: "* 필수 입력란입니다.",
                  validate: (value) =>
                    value === password || "* 비밀번호가 일치하지 않습니다.",
                })}
              />
              {confirmPasswordType === "password" ? (
                <LuEye onClick={() => setConfirmPasswordType("text")} />
              ) : (
                <LuEyeOff onClick={() => setConfirmPasswordType("password")} />
              )}
            </div>
            {errors.confirmPassword && (
              <p className="join-alert">
                {errors.confirmPassword.message?.toString() ?? ""}
              </p>
            )}
          </div>

          {/* 닉네임 */}
          <div className="user-nickname">
            <label>
              닉네임<span>*</span>
            </label>
            <input
              type="text"
              placeholder="닉네임은 2자 이상 입력해주세요."
              aria-invalid={
                isSubmitted ? (errors.nickname ? "true" : "false") : undefined
              }
              {...register("nickName", {
                required: "* 필수 입력란입니다.",
                minLength: {
                  value: 2,
                  message: "* 닉네임은 2자 이상이어야 합니다.",
                },
              })}
            />
            {errors.nickname && (
              <p className="join-alert">
                {errors.nickname.message?.toString() ?? ""}
              </p>
            )}
          </div>

          {/* 전화번호 */}
          <div className="user-phone">
            <label>
              휴대폰번호<span>*</span>
            </label>
            <input
              type="number"
              placeholder="- 제외하고 숫자만 입력해주세요."
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
            {errors.phone && (
              <p className="join-alert">
                {errors.phone.message?.toString() ?? ""}
              </p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting}>
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
