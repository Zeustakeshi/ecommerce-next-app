export const publicPage: string[] = ["/", "/products/*", "/shop"];

export const publicApis = ["/api/auth/*"];

export const authPages = ["/register", "/login"];

export const DEFAULT_LOGIN_REDIRECT: string = "/";

export const routeValidate = (pathname: string, validateRoutes: string[]) => {
    return validateRoutes.some((route) => {
        return pathname.match(new RegExp(`^${route.replace(/\*/g, ".*")}$`));
    });
};
