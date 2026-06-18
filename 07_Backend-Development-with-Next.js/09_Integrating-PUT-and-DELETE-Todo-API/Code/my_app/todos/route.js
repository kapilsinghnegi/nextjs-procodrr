import todos from "../../todos";
import { readFile, writeFile } from "fs/promises";

export async function GET() {
  const todosJSONString = await readFile("./todos.json", "utf-8");
  const todos = JSON.parse(todosJSONString);
  return Response.json(todos);
}

export async function POST(request) {
  const todo = await request.json();
  const newTodo = {
    id: crypto.randomUUID(),
    text: todo.text,
    completed: false,
  };
  todos.push(newTodo);
  await writeFile("todos.json", JSON.stringify(todos, null, 2));
  return Response.json(newTodo);
}
