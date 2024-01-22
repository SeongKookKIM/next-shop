import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { Editor } from "@toast-ui/react-editor";

interface EditorPropsType {
  contentRef: React.MutableRefObject<any>;
  content: string;
}

function Content({ contentRef, content }: EditorPropsType) {
  return (
    <>
      <Editor
        ref={contentRef}
        initialEditType="wysiwyg"
        hideModeSwitch={true}
        placeholder="상세내용을 입력해주세요."
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

export default Content;
