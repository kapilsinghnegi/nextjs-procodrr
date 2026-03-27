import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/user.model.js";

export const POST = async request => {
  await connectDB();
  const user = await request.json();
  const { name, email, password } = user;
  if (!name || !email || !password) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 409 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return Response.json({ name, email }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
};
