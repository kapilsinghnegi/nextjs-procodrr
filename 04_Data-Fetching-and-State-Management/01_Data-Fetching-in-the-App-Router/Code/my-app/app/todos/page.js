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
  const [todos, data2s, data3s] = await Promise.all(
    urls.map(url => fetchData(url)),
  );

  return (
    <>
      <h1>Todos</h1>
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
