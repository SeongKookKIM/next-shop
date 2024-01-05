"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuXCircle } from "react-icons/lu";

interface editBtnType {
  setEditBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setEditIdBtn: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | undefined;
}

function IdEdit({ setEditBtn, setEditIdBtn, userId }: editBtnType) {
  const [show, setShow] = useState<string>("");
  const [userEditId, setUserEditId] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  useEffect(() => {
    setUserEditId(userId);

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
      findId: userId,
      changeId: data.id,
    };

    if (window.confirm("아이디를 저장하시겠습니까?")) {
      axios
        .post("/api/profile/edit/editId", bodyData)
        .then((res) => {
          alert(res.data);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  return (
    <div className={`edit-id ${show}`}>
      <div className="edit-header">
        <strong>아이디 변경</strong>
        <LuXCircle
          onClick={() => {
            setEditBtn(false);
            setEditIdBtn(false);
          }}
        />
      </div>
      <div className="edit-body">
        <form onSubmit={handleSubmit(handlerEditId)}>
          <input
            type="text"
            defaultValue={userEditId}
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
            <p className="alert">{errors.id.message?.toString() ?? ""}</p>
          )}

          <div className="edit-guide">
            <ul>
              <li>
                <span>· 중복 닉네임은 불가합니다.</span>
              </li>
              <li>
                <span>· 영어와 숫자를 포함하여주세요.</span>
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

export default IdEdit;
