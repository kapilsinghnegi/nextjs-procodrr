import todosData from "../../todos";

export function GET() {
//   console.log("Running GET route handler");
  // return new Response(JSON.stringify(todosData), {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  return Response.json(todosData);
}
