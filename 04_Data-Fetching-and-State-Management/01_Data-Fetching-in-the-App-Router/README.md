# Data Fetching in Next.js

## Data Fetching in Client Component

To fetch data in client component, we need to use `useEffect` hook.

```jsx
"use client";

import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5",
      );
      const data = await res.json();
      console.log(data);
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <>
      <h1>Posts</h1>
      <div className="posts-container">
        {posts.map(({ id, title, body }) => (
          <div className="post-card" key={id}>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;
```

Server only sends a blank html page with static data to the client. Rest of the data is fetched and populated on the client side.

## Data Fetching in Server Component

To fetch data in server component, we can directly use `fetch` method.

```jsx
export default async function Todos() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5",
  );
  const todos = await res.json();
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
    </>
  );
}
```

The `fetch` method here is actually an extension of Web `fetch` API by Next.js to allow each request on the server to set its own persistent caching and revalidation semantics.

## Handling Loading State While Fetching Data in Next.js

If an API call takes a long time, we can show a loading indicator while the data is being fetched. We can create a file named `loading.js` and write code for loading state in it and it will automatically be shown to user while the data is being fetched. We'll create this file in the same directory where data is being fetched.

```js
// app/pages/todos/page.js
import { Slow2s, Slow3s } from "@/components/SlowComponent";
import TodosContainer from "@/components/TodosContainer";

export default function Todos() {
  const slowResponse = await fetch("https://procodrr.vercel.app/?sleep=3000");
  const data = await slowResponse.json();
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5",
  );
  const todos = await res.json();
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
    </>
  );
}

// app/pages/todos/loading.js
export default function Loading() {
  return (
    <>
      <h1>Todos</h1>
      <div className="todos-container">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="shimmer">
            <div className="shimmer-checkbox"></div>
            <div className="shimmer-text"></div>
          </li>
        ))}
      </div>
    </>
  );
}
```

If there's a blocking component, then we need to wrap it in a `<Suspense>` component. We should create a component for every blocking API call and then we can wrap it in a `<Suspense>` component. With this approach, our app will not freeze while the data is being fetched and will show data once it is available.

```jsx
// app/pages/todos/page.js
import { Slow2s, Slow3s } from "@/components/SlowComponent";
import TodosContainer from "@/components/TodosContainer";
import { Suspense } from "react";
import Loading from "./loading";

export default function Todos() {
  return (
    <>
      <h1>Todos</h1>
      <Suspense fallback={<Loading />}>
        <TodosContainer />
      </Suspense>
      <Suspense fallback={<p>Loading item 1</p>}>
        <Slow2s />
      </Suspense>
      <Suspense fallback={<p>Loading item 2</p>}>
        <Slow3s />
      </Suspense>
    </>
  );
}

// components/TodosContainer.js
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

// components/SlowComponent.js
export async function Slow2s() {
  const res = await fetch("https://procodrr.vercel.app/?sleep=2000");
  const data = await res.json();
  return <div>{data?.message ? data.message : data.error}</div>;
}

export async function Slow3s() {
  const res = await fetch("https://procodrr.vercel.app/?sleep=3000");
  const data = await res.json();
  return <div>{data?.message ? data.message : data.error}</div>;
}
```

## Parallel Data Fetching in Next.js

If we are fetching data in our page but we don't want to break down into different components, then we can fetch the data parallelly. Until now, we have been sequentially fetching the data. If any of api call is dependent on previous api call, then we should fetch the data sequentially but if it is independent, then we can fetch the data parallelly.

For parallel data fetching, we can use `Promise.all`

```jsx
// import { Slow2s, Slow3s } from "@/components/SlowComponent";
// import TodosContainer from "@/components/TodosContainer";
// import { Suspense } from "react";
// import Loading from "./loading";

async function fetchData(url) {
  const res = await fetch(url);
  return res.json();
}

export default async function Todos() {
  const [todoResponse, slowResponse1, slowResponse2] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5"),
    fetch("https://procodrr.vercel.app/?sleep=2000"),
    fetch("https://procodrr.vercel.app/?sleep=3000"),
  ]);

  const [todos, data2s, data3s] = await Promise.all([
    todoResponse.json(),
    slowResponse1.json(),
    slowResponse2.json(),
  ]);
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
```

We can clean code even more like this:

```jsx
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
```
