"use client";

export default function GlobalError({ unstable_retry }) {
  return (
    <html lang="en" className="dark">
      <body>
        <div>
          <p>Something went wrong in root route</p>
          <button onClick={() => unstable_retry()}>Try again</button>
        </div>
      </body>
    </html>
  );
}
