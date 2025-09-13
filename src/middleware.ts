import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // unauthorized হলে এখানে redirect করবে
  },
  callbacks: {
    authorized: ({ token, req }) => {
      if (!token) return false;

      const { pathname } = req.nextUrl;

      // /admin → শুধু admin + super-admin allowed
      if (pathname.startsWith("/admin")) {
        return token.role === "admin" || token.role === "super-admin";
      }

      // /super-admin → শুধু super-admin allowed
      if (pathname.startsWith("/super-admin")) {
        return token.role === "super-admin";
      }

      // /profile → যে কোনো logged-in user allowed
      if (pathname.startsWith("/profile")) {
        return !!token; // শুধু লগইন check
      }

      return true; // অন্য রুট গুলোতে restriction নাই
    },
  },
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/super-admin/:path*",
    "/profile/:path*", // Profile route এখন protect হলো
  ],
};
