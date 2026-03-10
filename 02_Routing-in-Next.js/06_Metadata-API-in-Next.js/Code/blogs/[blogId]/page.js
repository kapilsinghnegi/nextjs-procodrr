export async function generateMetadata({ params }) {
  const { blogId } = await params;
  return {
    title: `Blog ${blogId}`,
  };
}

export default async function Blog({ params }) {
  const { blogId } = await params;
  return <div>Blog {blogId}</div>;
}
