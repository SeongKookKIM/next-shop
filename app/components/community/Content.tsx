"use client";
import { Viewer } from "@toast-ui/react-editor";

interface ContentProps {
  content: string | undefined;
}

function Content({ content }: ContentProps) {
  return (
    <div className="cm-detail-content">
      <Viewer initialValue={content} />
    </div>
  );
}

export default Content;
