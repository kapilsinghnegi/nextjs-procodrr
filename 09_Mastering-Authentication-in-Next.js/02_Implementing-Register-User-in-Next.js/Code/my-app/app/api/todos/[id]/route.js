import { connectDB } from "@/lib/connectDB";
import Todo from "@/models/todo.model.js";

export async function GET(_, { params }) {
  const { id } = await params;
  const todo = await Todo.findById(id);
  if (!todo) return Response.json({ error: "Todo not found" }, { status: 404 });
  return Response.json(todo);
}

export async function PUT(request, { params }) {
  await connectDB();
  const editTodoData = await request.json();
  if (editTodoData.id)
    return Response.json({ error: "Cannot update id" }, { status: 400 });
  const { id } = await params;
  const editedTodo = await Todo.findByIdAndUpdate(id, editTodoData, {
    new: true,
  });
  return Response.json(editedTodo);
}

export async function DELETE(_, { params }) {
  await connectDB();
  const { id } = await params;
  const todo = await Todo.findById(id);
  if (!todo) return Response.json({ error: "Todo not found" }, { status: 404 });
  await Todo.findByIdAndDelete(id);
  return new Response(null, { status: 204 });
}
