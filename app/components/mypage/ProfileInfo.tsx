"use client";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React from "react";
import { LuChevronRight } from "react-icons/lu";

interface sessionType {
  session: Session | null;
}

function ProfileInfo({ session }: sessionType) {
  if (!session) {
    return <div>null</div>;
  }

  let router = useRouter();

  const handlerProfileDetail = () => {
    const userName = session.user?.name || session.user?.nickName;

    router.push(`/profile/${userName}?name=${userName}`);
  };

  return (
    <div className="profile-info" onClick={handlerProfileDetail}>
      <p>{session?.user?.name || session?.user?.nickName}</p>
      <span>{session?.user?.email}</span>
      <LuChevronRight className="profile-click" />
    </div>
  );
}

export default ProfileInfo;
