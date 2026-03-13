import Link from "next/link";

export const dynamicParams = false;

// ISR
// export const revalidate = 5;

// SSG
// export async function generateStaticParams() {
//   // return [{ blogId: "1" }, { blogId: "2" }, { blogId: "3" }, { blogId: "4" }];
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const data = await res.json();
//   return data.map(({ id }) => ({ blogId: id.toString() }));
// }

const Blog = async ({ params }) => {
  const { blogId } = await params;
  console.log(blogId);
  // ISR
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
  //   next: { revalidate: 10 },
  // });
  // const data = await res.json();
  // console.log(data)
  return (
    <>
      <nav>
        <ul className="navbar">
          <li>
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link href="/services" className="nav-link">
              Services
            </Link>
          </li>
          <li>
            <Link href="/blogs" className="nav-link active">
              Blogs
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <h1>Welcome to Our Blog {blogId}</h1>
        <p>Date: {new Date().toLocaleString()}</p>
        <p>This is blog {blogId} page.</p>
      </div>
    </>
  );
};

export default Blog;
