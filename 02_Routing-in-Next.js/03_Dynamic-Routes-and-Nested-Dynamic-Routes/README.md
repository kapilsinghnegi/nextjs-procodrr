# Dynamic Routes and Route Groups

## Dynamic Routing in Next.js

Whenever we create a component in Nextjs, for each component we receive a `props` object. This `props` object contains two properties: `params` and `searchParams`. `params` is used to get the dynamic parameters in the route and `searchParams` is used to get the query parameters in the URL.
We can use async-await to get values from `params` and `searchParams` objects since they both contain promises. They both contain empty objects by default.

For example,

1. If our path is `/about/1`, then `params` will be `{ id: "1" }` and `searchParams` will be `{}`.
2. If our path is `/about/?name=john`, then `params` will be `{}` and `searchParams` will be `{ name: "john" }`.
3. If our path is `/about/1?name=john`, then `params` will be `{ id: "1" }` and `searchParams` will be `{ name: "john" }`.
4. If our path is `/about/1?name=john&age=30`, then `params` will be `{ id: "1" }` and `searchParams` will be `{ name: "john", age: "30" }`.

Now, instead of creating multiple components for each route, we can create a single component for all the routes and use the `params` and `searchParams` objects to get the dynamic parameters and query parameters.

For example, instead of creating `blogs/1/page.js` and `blogs/2/page.js`, we can create a single component named `blogs/[id]/page.js` and then use the `params` object to get the value of `id`.

So, to create dynamic routes we create a new directory with name of `[slug]` inside the parent directory and then create a file named `page.js` inside it. Now, we can use the `params` object to get the value of `slug`. `slug` is the dynamic path we create in the route. It only works for a single dynamic path.

For eg. -

```js
export default async function Blog({ params }) {
  const { blogId } = await params;
  return <div>Blog {blogId}</div>;
}
```

## Nested Dynamic Routing in Next.js

To create nested dynamic routes we can use the same method as we use for creating nested routes in Next.js. When we create a nested route, we can use the same method to get the value of the dynamic path and we will get slug of our parent route also in the `params` object of our child route.

Suppose we want to create comments route to view all the comments on `blogId` above, then we can create further a nested comments directory inside the `blogs/[blogId]` directory and then create a file named `page.js` inside it. Now, we can use the `params` object to get the value of `blogId` and further we can create a dynamic route for viewing specific comment. We can create a file named `[commentId]/page.js` inside the `comments` directory and then we can use the `params` object to get the value of `commentId` and `blogId`.

```js
export default async function Comment({ params }) {
  const { blogId, commentId } = await params;
  return (
    <div>
      Comment <i>{commentId}</i> on blog <b>{blogId}</b>
    </div>
  );
}
```
