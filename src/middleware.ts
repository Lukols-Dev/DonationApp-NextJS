// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// export { default } from "next-auth/middleware";

export default withAuth(
  //   function middleware(request: NextRequestWithAuth) {
  //     if (
  //       request.nextUrl.pathname.startsWith("/klient") &&
  //       request.nextauth.token?.role !== "user"
  //     ) {
  //       return NextResponse.rewrite(new URL("/denied", request.url));
  //     }

  //     if (
  //       request.nextUrl.pathname.startsWith("/admin") &&
  //       request.nextauth.token?.role !== "admin"
  //     ) {
  //       return NextResponse.rewrite(new URL("/404", request.url));
  //     }
  //   },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    "/user",
    "/user/messages",
    "/user/wallet",
    "/user/monetisation",
    "/user/configurator",
    "/user/golas",
  ],
};
