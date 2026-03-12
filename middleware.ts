import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = request.cookies.get("admin_session")?.value;

    if (!session || !validateToken(session)) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
