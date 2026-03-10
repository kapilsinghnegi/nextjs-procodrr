import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { blogId } = await params;
  return {
    title: `Blog ${blogId}`,
  };
}

export default async function Blog({ params }) {
  const { blogId } = await params;
  if (!/^\d+$/.test(blogId)) {
    notFound();
  }
  return <div className="grow">Blog {blogId}</div>;
}
