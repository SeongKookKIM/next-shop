"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuXCircle, LuEye, LuEyeOff } from "react-icons/lu";

interface editBtnType {
  setEditBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setEditPasswordBtn: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | undefined;
}

function PasswordEdit({ setEditBtn, setEditPasswordBtn, userId }: editBtnType) {
  const [show, setShow] = useState<string>("");

  const [passwordConfirm, setPasswordConfirm] = useState<boolean>(false);

  useEffect(() => {
    let bgShow = setTimeout(() => {
      setShow("show");
    }, 700);

    return () => {
      clearTimeout(bgShow);
      setShow("");
    };
  }, []);

  return (
    <div className={`edit-password ${show}`}>
      <div className="edit-header">
        <strong>비밀번호 변경</strong>
        <LuXCircle
          onClick={() => {
            setEditBtn(false);
            setEditPasswordBtn(false);
            document.querySelector("body")?.classList.remove("active");
          }}
        />
      </div>
      <div className="edit-body">
        {passwordConfirm ? (
          <PasswordNew userId={userId} />
        ) : (
          <PasswordConfirm
            setPasswordConfirm={setPasswordConfirm}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
}

// 기존 비밀번호 확인
interface PasswordConfirmType {
  setPasswordConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | undefined;
}

function PasswordConfirm({ setPasswordConfirm, userId }: PasswordConfirmType) {
  const [passwordType, setPasswordType] = useState<string>("password");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const handlerEditId = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));

    let bodyData = {
      defaultPassword: data.password,
      userId: userId,
    };

    axios
      .post("/api/profile/edit/passwordConfirm", bodyData)
      .then((res) => {
        setPasswordConfirm(true);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(handlerEditId)}>
      <div className="password-wrapper">
        <input
          type={passwordType}
          aria-invalid={
            isSubmitted ? (errors.password ? "true" : "false") : undefined
          }
          {...register("password", {
            required: "* 필수 입력란입니다.",
          })}
        />
        {passwordType === "password" ? (
          <LuEye onClick={() => setPasswordType("text")} />
        ) : (
          <LuEyeOff onClick={() => setPasswordType("password")} />
        )}
      </div>

      <div className="edit-guide">
        <ul>
          <li>
            <span>· 기존 비밀번호를 입력해주세요.</span>
          </li>
        </ul>
      </div>
      <button type="submit" disabled={isSubmitting}>
        {" "}
        기존 비밀번호 입력
      </button>
    </form>
  );
}

// 비밀번호 변경

interface PasswordChangeType {
  userId: string | undefined;
}

function PasswordNew({ userId }: PasswordChangeType) {
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

  const handlerEditId = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));

    let bodyData = {
      password: data.password,
      userId: userId,
    };

    axios
      .post("/api/profile/edit/passwordChange", bodyData)
      .then((res) => {
        alert(res.data);
        document.querySelector("body")?.classList.remove("active");

        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <form onSubmit={handleSubmit(handlerEditId)} className="password-change">
      <div className="password-wrapper">
        <input
          type={passwordType}
          placeholder="숫자+영문자+특수문자 조합으로 8자리 이상"
          aria-invalid={
            isSubmitted ? (errors.password ? "true" : "false") : undefined
          }
          {...register("password", {
            required: "* 필수 입력란입니다.",
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
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
        <p className="alert">{errors.password.message?.toString() ?? ""}</p>
      )}

      <div className="confirm-password-wrapper">
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
        <p className="alert">
          {errors.confirmPassword.message?.toString() ?? ""}
        </p>
      )}

      <div className="edit-guide">
        <ul>
          <li>
            <span>
              · 숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.
            </span>
          </li>
        </ul>
      </div>
      <button type="submit" disabled={isSubmitting}>
        {" "}
        비밀번호 변경
      </button>
    </form>
  );
}

export default PasswordEdit;
