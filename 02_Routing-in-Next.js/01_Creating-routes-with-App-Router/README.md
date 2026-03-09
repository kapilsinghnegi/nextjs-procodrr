# Creating routes with App Router

In Next.js, our main entry point is the `app` directory. Actual code that runs on route is present in the `page.js` file. `layout.js` file is used to render the layout of the page. It is like `index.html` in React.js. `page.js` file directly inside app directory is the default/home route for our app.

A good thing about Next.js is that by default it shows an error page if the route is not found. We can also customize the error page using the `error.js` file.

To create a route using App Router, we need to create a new directory inside the `app` directory and create a file named `page.js` inside it.

To navigate between routes, we can use anchor tag `<a>` but it is not recommended as it reloads the whole page. Instead, we can use `Link` component from `next/link` package. It is like `<a>` tag but it doesn't reload the whole page.

```jsx
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/about">About</Link>
    </div>
  );
}
```
