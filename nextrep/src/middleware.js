import { clerkMiddleware } from "@clerk/nextjs/server";

export default function middleware(req) {
  console.log("Clerk middleware running for:", req.nextUrl.pathname);
  return clerkMiddleware()(req);
}

export const config = {
  matcher: [
    "/((?!_next|static|public|favicon.ico).*)",
  ],
};