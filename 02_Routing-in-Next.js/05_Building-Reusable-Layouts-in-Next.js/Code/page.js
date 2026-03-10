import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to My App</h1>
      <p>
        <Link href="/about">
          About
        </Link>
      </p>
      <p>
        <Link href="/services">Services</Link>
      </p>
      <p>
        <Link href="/blogs">Blogs</Link>
      </p>
      <p>
        <Link href="/files">Files</Link>
      </p>
    </div>
  );
}

