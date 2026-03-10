export default async function Comment({ params }) {
  const { blogId, commentId } = await params;
  return (
    <div>
      Comment <i>{commentId}</i> on blog <b>{blogId}</b>
    </div>
  );
}
