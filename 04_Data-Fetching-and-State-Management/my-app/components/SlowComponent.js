export async function Slow2s() {
  const res = await fetch("https://procodrr.vercel.app/?sleep=2000");
  const data = await res.json();
  return <div>{data?.message ? data.message : data.error}</div>;
}

export async function Slow3s() {
  const res = await fetch("https://procodrr.vercel.app/?sleep=3000");
  const data = await res.json();
  return <div>{data?.message ? data.message : data.error}</div>;
}
