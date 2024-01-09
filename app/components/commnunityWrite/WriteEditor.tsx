import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { Editor } from "@toast-ui/react-editor";

interface EdtorPropsType {
  editorRef: React.MutableRefObject<any>;
}

function WriteEditor({ editorRef }: EdtorPropsType) {
  // 줄바꿈
  // replace(/\n/g, "<br>");

  return (
    <>
      <Editor
        ref={editorRef}
        initialEditType="wysiwyg"
        hideModeSwitch={true}
        placeholder="글 내용을 입력해주세요."
        initialValue=" "
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
