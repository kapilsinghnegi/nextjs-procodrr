import todos from "@/todos.json";

export async function GET(_, { params }) {
  const { id } = await params;
  const todo = todos.find(todo => todo.id === Number(id));
  if (!todo) return Response.json({ error: "Todo not found" }, { status: 404 });
  return Response.json(todo);
}
