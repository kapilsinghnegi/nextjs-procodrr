# Catch All and Optional Routes

If we want a single file or folder to handle multiple URL segments then we can use catch-all routes.
To implement catch-all routes we can use the `[...slug]` directory syntax. This is called required catch-all route. Instead of matching the dynamic path, the catch-all route will match any URL segment after the `[...slug]` directory. The slug here will be an array of strings which will contain all the URL segments after the `[...slug]` directory.
If there is a hard-coded route then it will take precedence over the catch-all route.
For each dynamic path, we can only have one catch-all route - either required or optional.

```js
/files/[...slug]

export default async function File({ params }) {
  const { filePath } = await params;
  return <h1>File <i>/{filePath.join("/")}</i></h1>;
}

```

If we don't have a `page.js` file for the parent of catch-all route then it will throw an error. To solve this error, we can create `page.js` file for the parent of catch-all route if we want to. But, if we don't want to create a `page.js` file for the parent of catch-all route and use catch-all route only then we'll have to create an optional catch-all-route.

To create optional catch-all route we can use the `[[...slug]]` directory syntax.

```js
export default async function File({ params }) {
  const { filePath } = await params;
  return (
    <h1>
      File <i>/{filePath?.join("/")}</i>
    </h1>
  );
}
```

We use required catch-all route if we want at least one URL segment after the `[...slug]` directory. We use optional catch-all route if we don't want any URL segment after the `[...slug]` directory.

We cannot make optional catch-all route on root directory unlike required catch-all route. This is because it conflicts with root route for `/` path. If we delete our `page.js` file for the root route then we can use optional catch-all route on root directory.
