import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import fs from "fs";

export const runtime = "nodejs";

export default async function About() {
  console.log(fs)
  const cookieStore = await cookies();
  if (!cookieStore.get("sid")) redirect("/login");
  return <div>About page</div>;
}
