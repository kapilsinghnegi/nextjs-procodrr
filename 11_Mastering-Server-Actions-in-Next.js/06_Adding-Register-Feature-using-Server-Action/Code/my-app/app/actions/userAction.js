"use server";

import z from "zod";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/schema/userSchema";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/user.model.js";

export async function registerUser(_, formData) {
  const { data, error, success } = registerSchema.safeParse(formData);

  if (!success) {
    console.log(z.flattenError(error).fieldErrors);
    return { errors: z.flattenError(error).fieldErrors, success: false };
  }
  await connectDB();
  try {
    const { name, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return { success: true, message: `${email} registered successfully` };
  } catch (error) {
    if (error.code === 11000) {
      return { errors: { email: "Email already exists" } };
    } else {
      return { errors: { name: "Something went wrong" } };
    }
  }

  return { message: `${formData.email} registered`, data };
}
