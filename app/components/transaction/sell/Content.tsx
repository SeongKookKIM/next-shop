"use client";

import { useEffect } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

interface EditorPropsType {
  contentRef: React.MutableRefObject<any>;
  content: string | undefined;
}

function Content({ contentRef, content }: EditorPropsType) {
  return (
    <>
      <Editor
        ref={contentRef}
        initialEditType="wysiwyg"
        hideModeSwitch={true}
        initialValue={content || " "}
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
