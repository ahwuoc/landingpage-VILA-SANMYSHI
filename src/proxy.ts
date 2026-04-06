import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localeAdminMatch = pathname.match(/^\/(vi|en|th)\/admin/);
  if (localeAdminMatch) {
    const newPath = pathname.replace(/^\/(vi|en|th)\/admin/, '/admin');
    return NextResponse.redirect(new URL(newPath, request.url));
  }
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isLoginPage = pathname === "/admin/login";
  const isAdminAuthCheck = isAdminRoute && !isLoginPage;

  const isAdminApiRoute = pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth");

  if (isAdminAuthCheck || isAdminApiRoute) {
    const adminSession = request.cookies.get("admin_session");
    if (!adminSession || adminSession.value !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Skip intl for admin, api, maintenance, images etc.
  if (
    isAdminRoute ||
    pathname.startsWith("/api/admin") ||
    pathname === "/maintenance" ||
    pathname.includes("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icon")
  ) {
    return NextResponse.next();
  }

  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
  if (isMaintenanceMode) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/", "/(vi|en|th)/:path*",
    "/admin/:path*", "/api/admin/:path*"
  ],
};
