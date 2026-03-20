import todos from "@/todos.json";
import { writeFile } from "fs/promises";

export async function GET(_, { params }) {
  const { id } = await params;
  const todo = todos.find(todo => id === todo.id);
  if (!todo) return Response.json({ error: "Todo not found" }, { status: 404 });
  return Response.json(todo);
}

export async function PUT(request, { params }) {
  const editTodoData = await request.json();
  if (editTodoData.id)
    return Response.json({ error: "Cannot update id" }, { status: 400 });
  const { id } = await params;

  const todo = todos.find(todo => id === todo.id);
  if (!todo) return Response.json({ error: "Todo not found" }, { status: 404 });

  const editedTodo = { ...todo, ...editTodoData };
  todos.splice(todos.indexOf(todo), 1, editedTodo);
  await writeFile("todos.json", JSON.stringify(todos, null, 2));
  return Response.json(editedTodo);
}
