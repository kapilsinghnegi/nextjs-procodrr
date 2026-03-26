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
