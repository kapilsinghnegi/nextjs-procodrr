import "./blogId.css";
import "./hi.css";

const Blog = async ({ params }) => {
  const { blogId } = await params;
  return (
    <div className="blogId">
      <h1 className="title">Welcome to Our Blog {blogId}</h1>
      <p>This is blog {blogId} page.</p>
    </div>
  );
};

export default Blog;
