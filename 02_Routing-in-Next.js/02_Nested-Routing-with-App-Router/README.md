# Nested Routing with App Router

To create nested routes using App Router, we need to create a new directory inside the `app` directory and further create a new directory inside it. We can create a file named `page.js` inside them and then we can use `Link` component from `next/link` package to navigate between routes.

For eg., if we want to create a nested route for a specific service, we can create a new directory inside the `app/services` directory and then create a file named `page.js` inside it.

```jsx
import Link from "next/link";

export default function Services() {
  return (
    <div>
      <h1>All Services</h1>
      <p>
        <Link href="/services/app-dev">App Development</Link>
      </p>
      <p>
        <Link href="/services/web-dev">Web Development</Link>
      </p>
      <p>
        <Link href="/services/seo">SEO</Link>
      </p>
    </div>
  );
}
```

and further we can create a file named `page.js` inside the `app/services/app-dev` directory.

```jsx
export default function AppDev() {
  return <div>App Development Services</div>;
}
```

This will create a nested route for the `App Development` service. We can also create a file named `page.js` inside other directories to create nested routes for other services.

One thing to note is that we need to write full route paths in the `href` attribute of the `Link` component unlike react router.

This type of routing is only used when the routes we are creating are less in number. If there are a lot of routes, we can use dynamic routing instead.
