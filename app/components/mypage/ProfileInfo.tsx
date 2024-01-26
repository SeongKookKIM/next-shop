"use client";
import { UserType } from "@/app/Type";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuChevronRight } from "react-icons/lu";

interface sessionType {
  session: Session | null;
}

function ProfileInfo({ session }: sessionType) {
  const [user, setuser] = useState<UserType>();

  if (!session) {
    return <div>null</div>;
  }

  let router = useRouter();

  useEffect(() => {
    if (session) {
      setuser(session.user as UserType);
    }
  }, [session]);

  const handlerProfileDetail = () => {
    const userName = user?.name || user?.nickName;

    router.push(`/profile/${userName}?name=${userName}`);
  };

  return (
    <div className="profile-info" onClick={handlerProfileDetail}>
      <p>{user?.name || user?.nickName}</p>
      <span>{user?.email}</span>
      <LuChevronRight className="profile-click" />
    </div>
  );
}

export default ProfileInfo;
