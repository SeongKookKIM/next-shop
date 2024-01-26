"use client";

import { useEffect } from "react";

interface ContentProps {
  content: string | undefined;
}

function Content({ content }: ContentProps) {
  useEffect(() => {
    const textareaElement: any = document.querySelector(
      ".cm-detail-content textarea"
    );
    if (textareaElement) {
      textareaElement.style.height = "auto";
      textareaElement.style.height = `${Math.min(
        textareaElement.scrollHeight,
        300
      )}px`;
    }
  }, [content]);

  return (
    <div className="cm-detail-content">
      <textarea typeof="text" defaultValue={content} />
    </div>
  );
}

export default Content;
