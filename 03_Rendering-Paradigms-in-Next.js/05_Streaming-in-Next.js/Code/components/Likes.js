export default async function Likes() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return <div>2K Likes</div>;
}
