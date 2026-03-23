import { writeFile } from "fs/promises";
import { connectDB } from "@/lib/connectDB";
import Todo from "@/models/todo.model";
import todos from "../../todos";

await connectDB();

export async function GET() {
  await connectDB();
  const todos = await Todo.find();
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
