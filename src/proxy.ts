import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const AUTH_ROUTES = ["/", "/auth/login", "/auth/register"];
const PLAYER_ROUTES = ["/play"];
const HOST_ROUTES = ["/dashboard", "/quizzes", "/host"];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // For User
  const isHostRoute = HOST_ROUTES.some((r) => pathname.startsWith(r));

  // For Guest
  const isPlayerRoute = PLAYER_ROUTES.some((r) => pathname.startsWith(r));

  if (isHostRoute && (!token || token.isGuest)) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  if (isPlayerRoute) {
    if (!token) return NextResponse.redirect(new URL("/join", request.nextUrl));
    if (!token.isGuest)
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (token && !token.isGuest && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
