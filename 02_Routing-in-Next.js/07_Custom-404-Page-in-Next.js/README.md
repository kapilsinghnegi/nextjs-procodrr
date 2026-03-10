# Custom 404 Page in Next.js

When we navigate to a route that doesn't exist, Next.js will show a 404 page. But that's just one way to show 404 page. We can also show 404 based on conditions using `notFound` function of `next/navigation`.

```js
export default async function Blog({ params }) {
  const { blogId } = await params;
  if (blogId === "test") {
    notFound();
  }
  return <div>Blog {blogId}</div>;
}
```

Now, if you want to create a custom 404 page, then you can create a file named `not-found.js` in your `app` directory. We can create custom routes for different dynamic routes in our app by creating a `not-found.js` file in their respective directories. The thing to note is that we can only create a different `not-found.js` file for dynamic routes and for static routes, it will show root `not-found.js` file when we navigate to a route that doesn't exist.

We don't have access to params object in `not-found.js` file. So, we can't get the value of dynamic path in `not-found.js` file. But, we can create Not Found page as a client component to get the value of dynamic path in `not-found.js` file and `usePathname()` hook that is available in `next/navigation` to get the current URL.

```js
"use client";

import { usePathname } from "next/navigation";

export default function BlogNotFound() {
  const path = usePathname();
  return (
    <div className="grow flex justify-center items-center flex-col bg-neutral-900 text-white">
      <h1 className="text-2xl font-semibold leading-loose">
        404 - {path.split("/").pop()} Blog Not Found
      </h1>
      <p>
        Blog you are looking for does not exist. Please check the URL and try
        again.
      </p>
    </div>
  );
}
```
