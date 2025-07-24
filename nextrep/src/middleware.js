import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect everything except these Clerk auth routes:
    "/((?!_next|sign-in|sign-up|sign-out|api|static|.*\\..*).*)",
  ],
};
