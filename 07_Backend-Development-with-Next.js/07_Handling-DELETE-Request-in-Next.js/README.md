# Handling DELETE Request in Next.js

```js
export async function DELETE(_, { params }) {
  const { id } = await params;
  const todo = todos.find(todo => id === todo.id);
  if (!todo) return Response.json({ error: "Todo not found" }, { status: 404 });
  todos.splice(todos.indexOf(todo), 1);
  await writeFile("todos.json", JSON.stringify(todos, null, 2));
  return new Response(null, { status: 204 });
}
```
