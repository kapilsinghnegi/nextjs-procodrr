# Hydration in Next.js

Hydration is the process of adding interactivity to a page that has already been rendered. Hydration occurs on client components, Link components, and also checks if the page is exactly the same as the one that was rendered on the server, if not, then it will throw an error.

## Why does hydration errors occur in Next.js?

A hydration error in Next.js occurs when there is a mismatch between the HTML pre-rendered on the server and the initial React tree rendered in the browser. Hydration error is thrown only in development mode, and not in production mode (error will be thrown in console, but not on screen) but we still need to handle it.

What happens is html returned from the server is rendered again on the client with added interactivity and then it checks if both content are the same, if not then it throws an error.

In production mode, it will not throw any error on screen but on refresh it will flash the server rendered content for a little amount of time and then replace it with the client rendered content. This is still a bad experience for the user and therefore we need to handle it. This will cause CLS (Cumulative Layout Shift) which is a performance issue.

Hydration error occurs in the following cases:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.
