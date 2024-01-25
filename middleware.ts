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
  if (request.nextUrl.pathname === "/communityWrite") {
    if (session === null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (request.nextUrl.pathname === "/transaction/sell") {
    if (session === null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const buyRegex = /^\/transaction\/buy\/[a-zA-Z0-9-_]+$/;

  if (buyRegex.test(request.nextUrl.pathname)) {
    if (session === null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (request.nextUrl.pathname === "/myWrite") {
    if (session === null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (request.nextUrl.pathname === "/myPost") {
    if (session === null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
