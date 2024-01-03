"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";

function page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const testForm = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log(data);
  };

  return (
    <div className="login">
      <div className="login-inner">
        <h1 onClick={() => router.push("/")}>SHOP</h1>
        <form onSubmit={handleSubmit(testForm)}>
          <input
            type="text"
            placeholder="아이디를 입력해주세요."
            aria-invalid={
              isSubmitted ? (errors.id ? "true" : "false") : undefined
            }
            {...register("id", {
              required: "* 아이디를 입력해주세요.",
            })}
          />
          {errors.id && (
            <p className="login-alert">{errors.id.message?.toString()}</p>
          )}
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            aria-invalid={
              isSubmitted ? (errors.password ? "true" : "false") : undefined
            }
            {...register("password", {
              required: "* 비밀번호를 입력해주세요.",
            })}
          />
          {errors.password && (
            <p className="login-alert">{errors.password.message?.toString()}</p>
          )}

          <button type="submit" disabled={isSubmitting}>
            로그인
          </button>
        </form>
        <div className="login-signin">
          <span onClick={() => router.push("/join")}>회원가입</span>
        </div>

        <div className="oauth-login-wrapper">
          <ul>
            <li>
              <FcGoogle /> <span>구글 로그인</span>
            </li>
            <li>
              <GrGithub />
              <span> Github 로그인</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default page;
