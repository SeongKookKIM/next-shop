"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cmtype from "../components/commnunityWrite/Cmtype";
import Bg from "../components/commnunityWrite/Bg";
import axios from "axios";
import { useRouter } from "next/navigation";

function page() {
  const [cmType, setCmType] = useState<string>("자유게시판");
  const [cmTypeShow, setCmTypeShow] = useState<boolean>(false);
  const [cmTypeChecked, setCmTypeChecked] = useState<boolean>(false);

  let router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  useEffect(() => {
    setValue("type", cmType);
  }, [cmType, setValue]);

  const handelerTypeSelected = () => {
    setCmTypeShow(true);
    setCmTypeChecked(true);
    document.querySelector("body")?.classList.add("active");
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 1000)}px`;
  };

  const commnunitySubmit = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));

    let cmData = {
      type: data.type,
      title: data.title,
      content: data.content,
    };

    axios
      .post("/api/community/community", cmData)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data);
          router.push("/community");
          setTimeout(() => {
            router.refresh();
          }, 100);
        } else {
          alert("글 작성에 실패하였습니다.");
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="cm-write-inner">
      <form onSubmit={handleSubmit(commnunitySubmit)}>
        <div
          className="cm-type"
          onClick={() => {
            handelerTypeSelected();
          }}
        >
          <input
            type="text"
            defaultValue={cmType}
            placeholder="문의 유형을 선택해주세요.(클릭)"
            autoComplete="off"
            style={{ pointerEvents: "none" }}
            aria-invalid={
              isSubmitted ? (errors.type ? "true" : "false") : undefined
            }
            {...register("type", {
              required: "* 필수 입력란입니다.",
            })}
          />
          {errors.type && (
            <p className="alert">{errors.type.message?.toString()}</p>
          )}
        </div>
        <div className="cm-title">
          <input
            type="tesx"
            placeholder="글 제목을 입력해주세요."
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
        <div className="editor">
          <p>상세내용</p>
          <textarea
            typeof="text"
            placeholder="상세 내용을 입력해주세요."
            aria-invalid={
              isSubmitted ? (errors.content ? "true" : "false") : undefined
            }
            {...register("content", {
              required: "* 필수 입력란입니다.",
            })}
            onChange={(e) => {
              handleTextareaChange(e);
            }}
          />
          {errors.content && (
            <p className="alert">{errors.content.message?.toString()}</p>
          )}
        </div>
        <button type="submit" disabled={isSubmitting} className="cm-submit">
          작성완료
        </button>
      </form>
      {cmTypeShow && (
        <Bg setCmTypeShow={setCmTypeShow} setCmTypeChecked={setCmTypeChecked} />
      )}
      {cmTypeChecked && (
        <Cmtype
          setCmTypeShow={setCmTypeShow}
          setCmTypeChecked={setCmTypeChecked}
          setCmType={setCmType}
        />
      )}
    </div>
  );
}

export default page;
