import mongoose from "mongoose";
import { readFile, writeFile } from "fs/promises";
import { connectDB } from "@/lib/connectDB";
import todos from "../../todos";

await connectDB();

export async function GET() {
  await connectDB();

  const result = await mongoose.connection.db
    .collection("todos")
    .insertOne({ title: "Learn Node.js", completed: false });
  console.log(result);
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
