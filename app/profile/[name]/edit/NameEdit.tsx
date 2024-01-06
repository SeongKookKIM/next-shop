"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuXCircle } from "react-icons/lu";

interface editBtnType {
  setEditBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setEditNameBtn: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string | undefined;
}

function NameEdit({ setEditBtn, setEditNameBtn, userName }: editBtnType) {
  const [show, setShow] = useState<string>("");
  let session = useSession();

  let router = useRouter();

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
      findName: userName,
      changeName: data.name,
    };

    if (window.confirm("닉네임(이름)을 변경하시겠습니까?")) {
      axios
        .post("/api/profile/edit/editName", bodyData)
        .then((res) => {
          if (session.status === "authenticated") {
            session.update({ nickName: data.name });
            alert(res.data);
            router.push("/mypage");
            setTimeout(() => {
              router.refresh();
            }, 100);
          }
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  return (
    <div className={`edit-name ${show}`}>
      <div className="edit-header">
        <strong>닉네임(이름) 변경</strong>
        <LuXCircle
          onClick={() => {
            setEditBtn(false);
            setEditNameBtn(false);
          }}
        />
      </div>
      <div className="edit-body">
        <form onSubmit={handleSubmit(handlerEditId)}>
          <input
            type="text"
            defaultValue={userName}
            aria-invalid={
              isSubmitted ? (errors.name ? "true" : "false") : undefined
            }
            {...register("name", {
              required: "* 필수 입력란입니다.",
              minLength: {
                value: 2,
                message: "* 닉네임은 2자 이상이어야 합니다.",
              },
            })}
          />
          {errors.name && (
            <p className="alert">{errors.name.message?.toString() ?? ""}</p>
          )}

          <div className="edit-guide">
            <ul>
              <li>
                <span>· 중복 닉네임은 불가합니다.</span>
              </li>
              <li>
                <span>· 2자 이상이어야 합니다.</span>
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

export default NameEdit;
