export default async function Comments() {
  await new Promise(resolve => setTimeout(resolve, 5000));
  return <div>500 Comments</div>;
}
