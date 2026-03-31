"use server";

import { cookies } from "next/headers";
import z from "zod";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/connectDB";
import { loginSchema, registerSchema } from "@/lib/schema/userSchema";
import User from "@/models/user.model.js";
import Session from "@/models/session.model";
import { signCookie } from "@/lib/auth";

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
}

export async function loginUser(_, formData) {
  const { data, error, success } = loginSchema.safeParse(formData);

  if (!success) {
    console.log(z.flattenError(error).fieldErrors);
    return { errors: z.flattenError(error).fieldErrors, success: false };
  }
  await connectDB();
  const cookieStore = await cookies();
  const { email, password } = data;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        errors: { password: "Invalid credentials" },
        success: false,
      };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return {
        errors: { password: "Invalid credentials" },
        success: false,
      };
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

    return {
      success: true,
      message: `${email} logged in successfully`,
    };
  } catch (error) {
    return {
      error,
      errors: { email: "Something went wrong" },
      success: false,
    };
  }
}
