# How to recover from error without hard reload

If there's some unpredictable error that shows error page, and you need to hard reload it to recover. Instead, we can create a button and on click we can call `unstable_retry()` function. This will reload the page without hard reload.

```jsx
"use client";

export default function Error({ error, unstable_retry }) {
  return (
    <div>
      <p>Something went wrong</p>
      <button
        onClick={() => {
          unstable_retry();
        }}
      >
        Try again
      </button>
    </div>
  );
}
```