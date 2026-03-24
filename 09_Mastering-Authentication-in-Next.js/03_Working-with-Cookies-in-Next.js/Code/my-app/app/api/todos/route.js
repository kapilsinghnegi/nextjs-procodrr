import { connectDB } from "@/lib/connectDB";
import Todo from "@/models/todo.model.js";
import { cookies } from "next/headers";

await connectDB();

export async function GET(request) {
  await connectDB();
  const allTodos = await Todo.find();
  const cookieStore = await cookies();
  cookieStore.set("userId", "1234", {
    httpOnly: true,
    maxAge: 5,
  });
  return Response.json(
    allTodos.map(({ id, text, completed }) => ({ id, text, completed })),
  );
}

export async function POST(request) {
  const todo = await request.json();
  const { id, text, completed } = await Todo.create({ text: todo.text });
  return Response.json({ id, text, completed });
}
