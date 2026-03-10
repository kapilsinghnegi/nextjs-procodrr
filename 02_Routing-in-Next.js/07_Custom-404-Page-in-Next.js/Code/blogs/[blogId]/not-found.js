"use client";

import { usePathname } from "next/navigation";

export default function BlogNotFound() {
  const path = usePathname();
  return (
    <div className="grow flex justify-center items-center flex-col bg-neutral-900 text-white">
      <h1 className="text-2xl font-semibold leading-loose">
        404 - {path.split("/").pop()} Blog Not Found
      </h1>
      <p>
        Blog you are looking for does not exist. Please check the URL and try
        again.
      </p>
    </div>
  );
}
