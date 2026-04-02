import { getUserSession } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import Session from "@/models/session.model";
import { cookies } from "next/headers";

export const POST = async () => {
  await connectDB();
  const cookieStore = await cookies();
  const sessionId = await getUserSession();
  await Session.findByIdAndDelete(sessionId);
  cookieStore.delete("sid");
  return new Response(null, { status: 204 });
};
