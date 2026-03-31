"use server";

import z from "zod";
import { registerSchema } from "@/lib/schema/userSchema";

export async function registerUser(_, formData) {
  console.log(formData);
  const { data, error, success } = registerSchema.safeParse(formData);

  if (!success) {
    console.log(z.flattenError(error).fieldErrors);
    return { errors: z.flattenError(error).fieldErrors };
  }
  return { message: `${formData.email} registered`, data };
}
