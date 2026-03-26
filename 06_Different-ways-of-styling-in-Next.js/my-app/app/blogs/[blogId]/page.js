import styles from "./blogId.module.css";

const Blog = async ({ params }) => {
  const { blogId } = await params;
  return (
    <div>
      <h1 className={styles.title}>Welcome to Our Blog {blogId}</h1>
      <p>This is blog {blogId} page.</p>
    </div>
  );
};

export default Blog;
