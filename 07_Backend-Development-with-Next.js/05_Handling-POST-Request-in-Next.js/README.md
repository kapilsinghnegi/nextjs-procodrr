# Handling POST Request in Next.js

We can get data from the request using `request.json()` method.

```js
// @/todos/route.js
import { writeFile } from "fs/promises";

export async function POST(request) {
  const todo = await request.json();
  const newTodo = { id: , text: todo.text, completed: false };
  todos.push(newTodo);
  writeFile("todos.json", JSON.stringify(todos, null, 2));
  return Response.json(newTodo);
}
```
