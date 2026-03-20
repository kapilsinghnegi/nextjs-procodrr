# Dynamic Route in Next.js

if we want to create a route handler for a dynamic route, we will first need to create `route.js` file in the directory of the dynamic route. In that file, for creating a GET route handler, we will export a function named `GET` from the route file. This function gets first parameter as `request` and second parameter as `context`. We can destructure the `params` object from the `context` object and then use the `params` object to get the value of the dynamic path.

```js
// @/app/todos/[id]/route.js
import todos from "@/todos.json";

export async function GET(_, { params }) {
  const { id } = await params;
  const todo = todos.find(todo => todo.id === Number(id));
  if (!todo) return Response.json({ error: "Todo not found" }, { status: 404 });
  return Response.json(todo);
}
```
