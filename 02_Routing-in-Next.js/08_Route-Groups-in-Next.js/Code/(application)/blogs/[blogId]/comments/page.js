export default async function Comments({ params }) {
  const { blogId } = await params;
  return (
    <div className="grow">
      All comments on <b>{blogId}</b> page
    </div>
  );
}
