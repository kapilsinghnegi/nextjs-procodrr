"use client";

export default function Error({ error, unstable_retry }) {
  return (
    <div>
      <p>Something went wrong in client-side</p>
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
