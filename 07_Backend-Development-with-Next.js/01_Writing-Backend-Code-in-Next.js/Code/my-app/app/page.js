import Link from "next/link";
import React from "react";
import http from "http";

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.end("Hello from new Next.js server");
});

server.listen(4000, () => {
  console.log("Server started on port 4000");
});

export default function Home() {
  return (
    <div className="p-8">
      <Link href="/todos" className="text-neutral-100">
        - <span className="hover:text-neutral-100 hover:underline">Todos</span>
      </Link>
    </div>
  );
}

