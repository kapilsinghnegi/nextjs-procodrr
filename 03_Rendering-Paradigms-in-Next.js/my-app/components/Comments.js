"use client";

export default function Comments() {
  // await new Promise(resolve => setTimeout(resolve, 5000));
  // if (typeof window === "undefined") return <div>500 Comments Server</div>;
  // return <div>500 Comments {Math.random()}</div>;
  return <div>500 Comments {Date.now()}</div>;
}
