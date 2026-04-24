import createMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/verify",
  "/auth/forgot-password",
  "/auth/reset-password",
];

const protectedRoutes = ["/dashboard", "/profile", "/settings"];

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Get locale safely — always "ar" or "en"
  const parts = pathname.split("/");
  const locale = ["ar", "en"].includes(parts[1]) ? parts[1] : "ar";

  // Remove locale prefix cleanly
  const pathnameWithoutLocale = "/" + parts.slice(2).join("/");

  const isAuthRoute = authRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );

  // ✅ Logged in + on auth page → go to home
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // ✅ Not logged in + on protected page → go to login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
