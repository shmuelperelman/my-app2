import { NextResponse } from "next/server";

export default async function middleware(req) {
  const { pathname } = new URL(req.url);
  const excludedPaths = ["/login", "/register"];
  if (!excludedPaths.includes(pathname)) {
    const token = req.cookies.get("token"); 
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};