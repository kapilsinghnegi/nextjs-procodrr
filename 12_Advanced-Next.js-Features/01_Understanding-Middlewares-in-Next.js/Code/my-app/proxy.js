export const proxy = request => {
  // console.log(request.nextUrl.pathname);
  // console.log({ sid: request.cookies.get("sid")?.value });
  if (request.cookies.get("sid")) {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register"
    ) {
      return Response.redirect(new URL("/", request.nextUrl.origin));
    }
  } else if (request.nextUrl.pathname === "/") {
    return Response.redirect(new URL("/login", request.nextUrl.origin));
  }
};

export const config = {
  // matcher: l["/login", "/register", "/api/:path*"],
  matcher: ["/", "/login", "/register"],
};
