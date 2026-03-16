// import { Slow2s, Slow3s } from "@/components/SlowComponent";
// import TodosContainer from "@/components/TodosContainer";
// import { Suspense } from "react";
// import Loading from "./loading";

async function fetchData(url) {
  const res = await fetch(url);
  return res.json();
}

const urls = [
  "https://jsonplaceholder.typicode.com/todos?_limit=5",
  "https://procodrr.vercel.app/?sleep=2000",
  "https://procodrr.vercel.app/?sleep=3000",
];

export default async function Todos() {
  // const slowResponse = await fetch("https://procodrr.vercel.app/?sleep=3000");
  // const data = await slowResponse.json();
  // console.log(data);
  // const res = await fetch(
  //   "https://jsonplaceholder.typicode.com/todos?_limit=5",
  // );
  // const todos = await res.json();
  // const [todoResponse, slowResponse1, slowResponse2] = await Promise.all([
  //   fetch("https://jsonplaceholder.typicode.com/todos?_limit=5"),
  //   fetch("https://procodrr.vercel.app/?sleep=2000"),
  //   fetch("https://procodrr.vercel.app/?sleep=3000"),
  // ]);

  // const [todos, data2s, data3s] = await Promise.all([
  //   todoResponse.json(),
  //   slowResponse1.json(),
  //   slowResponse2.json(),
  // ]);

  const [todos, data2s, data3s] = await Promise.all(
    urls.map(url => fetchData(url)),
  );

  return (
    <>
      <h1>Todos</h1>
      {/* <div className="todos-container">
        {todos.map(({ id, title, completed }) => (
          <div className="todo-item" key={id}>
            <input type="checkbox" checked={completed} readOnly />
            <h3>{title}</h3>
          </div>
        ))}
      </div> */}
      {/* <Suspense fallback={<Loading />}>
        <TodosContainer />
      </Suspense>
      <Suspense fallback={<p>Loading item 1</p>}>
        <Slow2s />
      </Suspense>
      <Suspense fallback={<p>Loading item 2</p>}>
        <Slow3s />
      </Suspense> */}
      <div className="todos-container">
        {todos.map(({ id, title, completed }) => (
          <div className="todo-item" key={id}>
            <input type="checkbox" checked={completed} readOnly />
            <h3>{title}</h3>
          </div>
        ))}
      </div>
      <div>{data2s?.message ? data2s.message : data2s.error}</div>
      <div>{data3s?.message ? data3s.message : data3s.error}</div>
    </>
  );
}
