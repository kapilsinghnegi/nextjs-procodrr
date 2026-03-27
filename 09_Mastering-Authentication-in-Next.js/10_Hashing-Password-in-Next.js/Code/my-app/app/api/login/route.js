import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/connectDB";
import { signCookie } from "@/lib/auth";
import User from "@/models/user.model.js";
import Session from "@/models/session.model.js";

export const POST = async req => {
  await connectDB();
  const cookieStore = await cookies();
  const { email, password } = await req.json();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return Response.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const existingSessions = await Session.find({ userId: user._id });
    if (existingSessions.length >= 2) {
      await Session.deleteOne({
        _id: existingSessions[0]._id,
      });
    }

    const session = await Session.create({ userId: user._id });

    cookieStore.set("sid", signCookie(session.id), {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });

    return Response.json(
      { name: user.name, email: user.email },
      {
        status: 200,
      },
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
};
