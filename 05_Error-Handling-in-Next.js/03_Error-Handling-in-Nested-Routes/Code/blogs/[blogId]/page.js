const Blog = async ({ params }) => {
  const { blogId } = await params;

  // if (blogId % 2 == 0) {
  //   return "BlogId must be odd";
  // }

  // const randomNumber = Math.random();

  // console.log(randomNumber);

  // if (randomNumber > 0.5) {
  //   throw new Error("Error occurred");
  // }  

  return (
      <div>
        <h1>Welcome to Our Blog {blogId}</h1>
        <p>This is blog {blogId} page.</p>
      </div>
  )
};

export default Blog;
