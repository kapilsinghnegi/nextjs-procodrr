# Creating GET Route Handler in Next.js

A route file allows you to create custom request handlers for a given route. The following HTTP methods are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS.

To create a GET route, we will export a function named `GET` from the route file.

```js
// @/app/todos/route.js
export function GET() {
  console.log("Running GET route handler");
  return new Response(JSON.stringify({ message: "Hello World!" }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
```

Here, to return a response from the route handler, we will use the `Response` constructor. We'll set the `Content-Type` header to `application/json` as we want our response to be in JSON format, by default the `Response` constructor will set the `Content-Type` header to `text/html`.

If we want to import json in our route handler, normally javascript doesn't allow us to import json from a file, so we need to import it like this: `import todosData from "./todos.json" with { type: "json" }` but Next.js will do it for us.

```js
// @/app/todos/route.js
import todosData from "./todos.json";
export function GET() {
  return new Response(JSON.stringify(todosData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
```

We can also write the above code as follows:

```js
// @/app/todos/route.js
import todosData from "./todos.json";
export async function GET() {
  return Response.json(todosData);
}
```

Next.js automatically stringifies the response and converts the response to JSON and sets the `Content-Type` header to `application/json` if we use the `Response.json` function.
