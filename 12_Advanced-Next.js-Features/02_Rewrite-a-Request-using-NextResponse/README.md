# Rewrite a Request using NextResponse

Next.js provides us NextResponse which extends native Response class. It gives us access to the `rewrite` method which allows us to rewrite a request. We can import it like this: `import { NextResponse } from "next/server";` By using `rewrite` method, it opens the desired page without changing the URL. It starts serving desired page content without changing the URL. This can be used when we want to show same content on different URL.

```js
// @/proxy.js

export const proxy = request => {
  return NextResponse.rewrite(new URL("/", request.nextUrl.origin));
};

export const config = {
  matcher: ["/home"],
};
```

We can also redirect from Server Components using `redirect()` method from `next/navigation`. We can use `cookies` from `next/headers` only in Server Components.

```js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function About() {
  const cookieStore = await cookies();
  if (!cookieStore.get("sid")) redirect("/login");
  return <div>About page</div>;
}
```
