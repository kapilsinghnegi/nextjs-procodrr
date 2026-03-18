"use client";

export default function Error({ error, unstable_retry }) {
  // console.log(error);
  // console.log(error.message)
  // console.log(error.digest)
  return (
    <div>
      <p>Something went wrong</p>
      {/* <p>Try to reload this page</p> */}
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
