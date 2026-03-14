"use client";

import { useState } from "react";

export default function Likes() {
  // await new Promise(resolve => setTimeout(resolve, 2000));
  const [likes, setLikes] = useState(0);
  return <div onClick={() => setLikes(likes => likes + 1)}>{likes} Likes</div>;
}
