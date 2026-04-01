# Understanding Middlewares in Next.js

In Next.js, we don't have multiple middleware files like we did in Express.js. Instead, Next.js uses a single middleware file to handle all the middleware logic.

Right now, if user directly tries to access the homepage, it shows homepage for few seconds and then redirects to login page. This happens because when a user tries to access the homepage, Next.js first checks if the user is authenticated or not. If the user is authenticated, it shows the homepage. If the user is not authenticated, it shows the login page. We can fix this issue by using a middleware.

To create a middleware, we create `proxy.js` file in our root folder(`@`). This file must export a default function or a function named `proxy`. This function gets `request` as first parameter. This middleware runs for every request that comes to our app. If we want to set it for a particular route, we can export a `config` object and we'll ad a property named `matcher` where we either set it as a single path or an array of paths.

To fix the above issue, We can keep our `matcher` as `[/]`. Then, to redirect the user to the login page, we can return `Response.redirect()` function which contains the URL of the login page or desired page. We can also give JavaScript Constructor `new URL()` which accepts `url` and `base` as parameters and returns a `URL` object which we can use to get the URL by calling `toString()` method. For base, we can use `request`'s `nextUrl.origin` property. It applies `toString()` method automatically, when we use it.

```js
// @/proxy.js
export const proxy = request => {
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
  matcher: ["/", "/login", "/register"],
};
```
