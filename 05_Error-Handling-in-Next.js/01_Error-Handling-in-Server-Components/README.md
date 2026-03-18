# Error handling in Server Components in Next.js

When we encounter an error on production, it stops the app from running.  
 We can handle error in Next.js using `error.js` file in the `app` directory. In this file, we have to create a Client Component that displays on error and it has error object as a prop. We can use the error object to display the error message.

This Error Component wraps our page inside an error boundary and provides returned jsx as a fallback.

`error.js` file helps us handle unintended errors. `error.digest` is a unique identifier for the error. It can be used to identify the error in the server logs. `error.message` shows different messages based on environment. If we throw some error in our `page.js` on certain conditions and show `error.message` in `error.js`, it will show different messages in development and production mode. Since, in development mode, we get the error from the server, we should not show the error message to the user as it may contain sensitive information.

If we want to handle such errors, we can return the error message we want to show to the user in `page.js` for that condition.

```js
// /app/blogs/[blogId]/page.js
const Blog = async ({ params }) => {
  const { blogId } = await params;

  if (blogId % 2 == 0) {
    return "BlogId must be odd";
  }

  return (
    <>
      <div>
        <h1>Welcome to Our Blog {blogId}</h1>
        <p>This is blog {blogId} page.</p>
      </div>
    </>
  );
};

export default Blog;

// /app/blogs/[blogId]/error.js
"use client";
export default function Error({ error }) {
  return (
    <div>
      <p>Something went wrong:</p>
    </div>
  );
}
```

![Error Overview](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Fdark%2Ferror-overview.png&w=3840&q=75)
