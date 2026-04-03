import { redirect } from "next/navigation";
import SignIn from "../components/SignIn";
import { auth } from "@/auth";

export default async function Login() {
  const session = await auth();
  if (session) {
    return redirect("/");
  }
  return (
    <div>
      <SignIn />
    </div>
  );
}
