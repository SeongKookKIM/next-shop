"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Cmtype from "../../components/commnunityWrite/Cmtype";
import Bg from "../../components/commnunityWrite/Bg";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";

type StateTypes = { id: string };

function page() {
  let state: StateTypes = useParams() || { id: "" };
  const { data, error } = useSWR(`/api/community/communityEdit?id=${state.id}`);

  const [cmType, setCmType] = useState<string>("자유게시판");
  const [cmTypeShow, setCmTypeShow] = useState<boolean>(false);
  const [cmTypeChecked, setCmTypeChecked] = useState<boolean>(false);
  const [cmPostId, setCmPostId] = useState<string>("");

  let router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  useEffect(() => {
    if (data) {
      setCmType(data.type);
      setCmPostId(data._id);
    }
    document.querySelector("body")?.classList.remove("active");
  }, [data]);

  useMemo(() => {
    setValue("type", cmType);
  }, [cmType, setValue]);

  const handelerTypeSelected = () => {
    setCmTypeShow(true);
    setCmTypeChecked(true);
    document.querySelector("body")?.classList.add("active");
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 300)}px`;
  };

  useEffect(() => {
    // 페이지 로드 시 초기 높이 설정
    const textareaElement: any = document.querySelector(".editor textarea");
    if (textareaElement) {
      textareaElement.style.height = "auto";
      textareaElement.style.height = `${Math.min(
        textareaElement.scrollHeight,
        300
      )}px`;
    }
  }, [data]);

  const commnunitySubmit = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));

    let cmData = {
      type: data.type,
      title: data.title,
      content: data.content,
      _id: cmPostId,
    };

    axios
      .post("/api/community/communityEditPost", cmData)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data);
          router.back();

          setTimeout(() => {
            router.refresh();
            window.location.reload();
          }, 100);
        } else {
          alert("글 수정에 실패하였습니다.");
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
            value={data ? data.title : ""}
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
          <textarea
            typeof="text"
            placeholder="상세 내용을 입력해주세요."
            defaultValue={data ? data.content : ""}
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
        </div>
        <button type="submit" disabled={isSubmitting} className="cm-submit">
          글 수정
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
