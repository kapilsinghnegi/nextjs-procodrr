import { cookies } from "next/headers";
import { connectDB } from "@/lib/connectDB";
import { getLoggedInUser } from "@/lib/auth";
import Todo from "@/models/todo.model.js";

export async function GET(_, { params }) {
  await connectDB();
  const user = await getLoggedInUser();
  if (user instanceof Response) return user;

  const { id } = await params;
  const todo = await Todo.findOne({ _id: id, userId: user.id });
  if (!todo) return Response.json({ error: "Todo not found" }, { status: 404 });
  if (user.id !== todo.userId.toString())
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json(todo);
}

export async function PUT(request, { params }) {
  await connectDB();
  const user = await getLoggedInUser();
  if (user instanceof Response) return user;

  const { id } = await params;
  const todo = await Todo.findOne({ _id: id, userId: user.id });
  if (!todo) return Response.json({ error: "Todo not found" }, { status: 404 });

  if (user.id !== todo.userId.toString())
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const editTodoData = await request.json();
  if (editTodoData.id)
    return Response.json({ error: "Cannot update id" }, { status: 400 });

  const editedTodo = await Todo.updateMany(
    { _id: id, userId: user.id },
    editTodoData,
    {
      new: true,
    },
  );
  return Response.json(editedTodo);
}

export async function DELETE(_, { params }) {
  await connectDB();

  const user = await getLoggedInUser();
  if (user instanceof Response) return user;

  const { id } = await params;
  const todo = await Todo.findOne({ _id: id, userId: user.id });
  if (!todo) return Response.json({ error: "Todo not found" }, { status: 404 });

  if (user.id !== todo.userId.toString())
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await Todo.deleteOne({ _id: id, userId: user.id });
  return new Response(null, { status: 204 });
}
