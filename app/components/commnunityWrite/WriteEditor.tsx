"use client";

import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useEffect } from "react";

interface EditorPropsType {
  editorRef: React.MutableRefObject<any>;
  content: string;
}

function WriteEditor({ editorRef, content }: EditorPropsType) {
  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();

      editorInstance.setMarkdown(content || "");
    }
  }, [content, editorRef]);

  return (
    <>
      <Editor
        ref={editorRef}
        initialEditType="wysiwyg"
        hideModeSwitch={true}
        placeholder="글 내용을 입력해주세요."
        initialValue={content ? content : " "}
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
        ]}
        theme={""}
        usageStatistics={false}
      />
    </>
  );
}

export default WriteEditor;
