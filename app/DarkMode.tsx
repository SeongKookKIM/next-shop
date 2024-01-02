"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CookieType } from "./Type";

export default function DarkMode() {
  const [changeMode, setChangeMode] = useState<string>("🌙");

  let router = useRouter();

  useEffect(() => {
    let cookieMode: CookieType = (
      ("; " + document.cookie).split(`; mode=`).pop() || ""
    ).split(";")[0];

    if (cookieMode == "") {
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
    }
  }, []);

  const hanlderChangeMode = () => {
    let cookieMode: CookieType = (
      ("; " + document.cookie).split(`; mode=`).pop() || ""
    ).split(";")[0];

    if (cookieMode == "light") {
      document.cookie = "mode=dark; max-age=" + 3600 * 24 * 400;
      setChangeMode("☀️");
      router.refresh();
    } else {
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
      setChangeMode("🌙");
      router.refresh();
    }
  };
  return (
    <div className="mode">
      <span onClick={hanlderChangeMode}>{changeMode}</span>
    </div>
  );
}
