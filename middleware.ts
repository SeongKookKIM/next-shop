import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(request: any) {
  const session = await getToken({ req: request });

  if (request.nextUrl.pathname === "/mypage") {
    if (session === null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (request.nextUrl.pathname === "/profile/edit") {
    if (session === null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
