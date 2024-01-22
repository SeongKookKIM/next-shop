"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuXCircle } from "react-icons/lu";

interface editBtnType {
  setEditBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setEditEmailBtn: React.Dispatch<React.SetStateAction<boolean>>;
  userEmail: string | undefined;
}

function EmailEdit({ setEditBtn, setEditEmailBtn, userEmail }: editBtnType) {
  const [show, setShow] = useState<string>("");
  const [userEditEmail, setUserEditEmail] = useState<string | undefined>("");

  let session = useSession();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  useEffect(() => {
    setUserEditEmail(userEmail);

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
      findEmail: userEmail,
      changeEmail: data.email,
    };

    if (window.confirm("이메일을 변경하시겠습니까?")) {
      axios
        .post("/api/profile/edit/editEmail", bodyData)
        .then((res) => {
          if (session.status === "authenticated") {
            session.update({ email: data.email });
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
    <div className={`edit-email ${show}`}>
      <div className="edit-header">
        <strong>이메일 변경</strong>
        <LuXCircle
          onClick={() => {
            setEditBtn(false);
            setEditEmailBtn(false);
            document.querySelector("body")?.classList.remove("active");
          }}
        />
      </div>
      <div className="edit-body">
        <form onSubmit={handleSubmit(handlerEditId)}>
          <input
            type="text"
            defaultValue={userEditEmail}
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
            <p className="alert">{errors.email.message?.toString() ?? ""}</p>
          )}

          <div className="edit-guide">
            <ul>
              <li>
                <span>· @를 포함한 올바른 이메일을 입력해주세요.</span>
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

export default EmailEdit;
