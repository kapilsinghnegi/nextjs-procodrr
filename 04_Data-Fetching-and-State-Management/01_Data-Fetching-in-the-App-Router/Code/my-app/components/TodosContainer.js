export default async function TodosContainer() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5",
  );
  const todos = await res.json();
  return (
    <div className="todos-container">
      {todos.map(({ id, title, completed }) => (
        <div className="todo-item" key={id}>
          <input type="checkbox" checked={completed} readOnly />
          <h3>{title}</h3>
        </div>
      ))}
    </div>
  );
}
