# Error Handling in Nested Routes

Instead of creating multiple error pages, Next.js allows you to handle errors in nested routes by creating `error.js` file in the parent route. Error bubbles up to the parent route.

Whenever error occurs our `page.js` code is wrapped inside `<ErrorBoundary />` and Error Boundary is further wrapped inside `layout.js` file code which is then wrapped inside `ErrorBoundary` if it has a parent and parent has `error.js` file which is further wrapped inside `layout.js` file and so on.

In the component hierarchy, `error.js` wraps `loading.js`, `not-found.js`, `page.js`, and nested `layout.js` files in a React error boundary. It does not wrap the `layout.js` or `template.js` above it in the same segment.

Same level error in `layout.js` file cannot be caught by `error.js` file since `layout.js` has higher hierarchy than `error.js` file. For handling that error, we have to create or move `error.js` file in the parent route.

If we want our `layout.js` to show even if there is an error in its child route, we can use `errorBoundary` prop in `layout.js` file.
