"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Cmtype from "../components/commnunityWrite/Cmtype";
import Bg from "../components/commnunityWrite/Bg";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/navigation";

const WriteEditor = dynamic(
  () => import("../components/commnunityWrite/WriteEditor"),
  {
    ssr: false,
  }
);

function page() {
  const [cmType, setCmType] = useState<string>("자유게시판");
  const [cmTypeShow, setCmTypeShow] = useState<boolean>(false);
  const [cmTypeChecked, setCmTypeChecked] = useState<boolean>(false);

  const editorRef = useRef<any>(null);

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

  const commnunitySubmit = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));

    const editorIns = editorRef?.current?.getInstance();

    const contentMark = editorIns.getMarkdown();

    let cmData = {
      type: data.type,
      title: data.title,
      content: contentMark,
    };

    if (contentMark?.length === 0) {
      alert("글내용을 작성해주세요.");
      return;
    } else {
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
    }
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
          <WriteEditor editorRef={editorRef} content="" />
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
