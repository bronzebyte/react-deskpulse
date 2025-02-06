import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");

  if (
    !token &&
    !["/sign-in", "/sign-up", "/reset-password"].includes(req.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (
    token &&
    ["/sign-in", "/sign-up", "/reset-password"].includes(req.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/reset-password",
    "/teams",
    "/project-view/:path*",
    "/members",
    "/members/:path*",
  ],
};
