import { connectDB } from "@/lib/connectDB";
import User from "@/models/user.model.js";
import { cookies } from "next/headers";

export const POST = async req => {
  await connectDB();
  const cookieStore = await cookies();
  const { email, password } = await req.json();
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return Response.json({ error: "Invalid credentials" }, { status: 400 });
    }
    cookieStore.set("userId", user.id, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });
    return Response.json(user, {
      status: 200,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
};
