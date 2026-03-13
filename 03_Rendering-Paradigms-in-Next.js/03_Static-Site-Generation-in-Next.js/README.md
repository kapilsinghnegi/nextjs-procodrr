# Static Site Generation in Next.js

Static Site Generation (SSG) is also a part of server-side rendering where a dynamic page is generated at build time and served to the client. Frequently visited pages are applied SSG so that those pages don't take build time and load faster to improve performance.

To implement SSG in Next.js, we can use generateStaticParams() method. We have to export a function and it should return an array of objects where each object represents the populated dynamic segments of a single route.([{slug: value1}, {slug: value2}])

```js
export function generateStaticParams() {
  return [{ blogId: "1" }, { blogId: "2" }, { blogId: "3" }, { blogId: "4" }];
}
```

| Example Route                  | generateStaticParams Return Type        |
| ------------------------------ | --------------------------------------- |
| /product/[id]                  | { id: string }[]                        |
| /products/[category]/[product] | { category: string, product: string }[] |
| /products/[...slug]            | { slug: string[] }[]                    |

A problem with SSG is that if content of the page changes a lot or is updated frequently then it should not be used it locks data into the page at build time. This causes users to see outdated or "stale" information unless you trigger a complete rebuild and deployment of your entire application. in such cases, we can use Incremental Static Regeneration (ISR).

By default, as user visits a non-generated page, a new page is generated and served to the client and it is statically generated (only once) and user can visit the same page again and again. But if we don't want this behavior, then we can also export a variable named `dynamicParams` as `false` if we don't want to generate params other than the ones returned by `generateStaticParams()` method. It will show 404 page as the new page will not be generated.
