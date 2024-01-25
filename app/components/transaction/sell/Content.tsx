"use client";

import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useEffect } from "react";

interface EditorPropsType {
  contentRef: React.MutableRefObject<any>;
  content: string | undefined;
}

function Content({ contentRef, content }: EditorPropsType) {
  useEffect(() => {
    if (contentRef.current) {
      const editorInstance = contentRef.current.getInstance();

      editorInstance.setMarkdown(content || "");
    }
  }, [content, contentRef]);

  return (
    <>
      <Editor
        ref={contentRef}
        initialEditType="wysiwyg"
        hideModeSwitch={true}
        initialValue={content || ""}
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

export default Content;
