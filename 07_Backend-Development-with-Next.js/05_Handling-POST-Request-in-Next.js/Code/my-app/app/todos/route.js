import todos from "../../todos";
import { writeFile } from "fs/promises";

export function GET() {
  //   console.log("Running GET route handler");
  // return new Response(JSON.stringify(todosData), {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
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
  writeFile("todos.json", JSON.stringify(todos, null, 2));
  return Response.json(newTodo);
}
