import authConfig from "@/auth.configs";
import {
    DEFAULT_LOGIN_REDIRECT,
    authPages,
    publicApis,
    publicPage,
    routeValidate,
} from "@/routes";
import NextAuth from "next-auth";

export const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
    const { nextUrl } = req;
    const pathname = nextUrl.pathname;

    const isLoggedIn = !!req.auth;

    const isPublicApi = routeValidate(pathname, publicApis);
    const isPublicPage = routeValidate(pathname, publicPage);

    const isAuthPage = routeValidate(pathname, authPages);

    // check auth page
    if (isAuthPage) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    // check public page and public api
    if (isPublicApi || isPublicPage) return null;

    // check private page
    if (!isLoggedIn && !isPublicPage) {
        return Response.redirect(new URL("/login", nextUrl));
    }
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
