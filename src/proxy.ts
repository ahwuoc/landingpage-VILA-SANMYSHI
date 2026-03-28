import { NextRequest, NextResponse } from "next/server";

const ADMIN_PREFIX = "/admin";
const ADMIN_API_PREFIX = "/api/admin";
const LOGIN_PATH = "/admin/login";
const AUTH_API_PATH = "/api/admin/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === LOGIN_PATH || pathname === AUTH_API_PATH) {
    return NextResponse.next();
  }
  const session = request.cookies.get("admin_session");
  if (!session?.value) {
    if (pathname.startsWith(ADMIN_API_PREFIX)) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in to access this resource" },
        { status: 401 }
      );
    }
    if (pathname.startsWith(ADMIN_PREFIX)) {
      const loginUrl = new URL(LOGIN_PATH, request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
