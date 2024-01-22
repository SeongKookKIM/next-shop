"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuXCircle } from "react-icons/lu";

interface editBtnType {
  setEditBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setEditPhoneBtn: React.Dispatch<React.SetStateAction<boolean>>;
  userPhone: string | undefined;
}

function PhoneEdit({ setEditBtn, setEditPhoneBtn, userPhone }: editBtnType) {
  const [show, setShow] = useState<string>("");

  let session = useSession();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  useEffect(() => {
    let bgShow = setTimeout(() => {
      setShow("show");
    }, 700);

    return () => {
      clearTimeout(bgShow);
      setShow("");
    };
  }, []);

  const handlerEditId = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));

    let bodyData = {
      findPhone: userPhone,
      changePhone: data.phone,
    };

    if (window.confirm("연락처(핸드폰)를 변경하시겠습니까?")) {
      axios
        .post("/api/profile/edit/editPhone", bodyData)
        .then((res) => {
          if (session.status === "authenticated") {
            session.update({ phone: data.phone });
            alert(res.data);
            document.querySelector("body")?.classList.remove("active");

            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };
  return (
    <div className={`edit-phone ${show}`}>
      <div className="edit-header">
        <strong>연락처(핸드폰) 변경</strong>
        <LuXCircle
          onClick={() => {
            setEditBtn(false);
            setEditPhoneBtn(false);
            document.querySelector("body")?.classList.remove("active");
          }}
        />
      </div>
      <div className="edit-body">
        <form onSubmit={handleSubmit(handlerEditId)}>
          <input
            type="text"
            defaultValue={userPhone}
            aria-invalid={
              isSubmitted ? (errors.phone ? "true" : "false") : undefined
            }
            {...register("phone", {
              required: "* 필수 입력란입니다.",
              pattern: {
                value: /^[0-9]*$/,
                message: "* 올바른 핸드폰 번호를 입력해주세요.",
              },
            })}
          />
          {errors.phone && (
            <p className="alert">{errors.phone.message?.toString() ?? ""}</p>
          )}

          <div className="edit-guide">
            <ul>
              <li>
                <span>· - 제외하고 숫자만 입력해주세요.</span>
              </li>
            </ul>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {" "}
            저장
          </button>
        </form>
      </div>
    </div>
  );
}

export default PhoneEdit;
