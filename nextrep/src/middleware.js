export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/client/:path*",
    // add more protected routes here
  ],
};