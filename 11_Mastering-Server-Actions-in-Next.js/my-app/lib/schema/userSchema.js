import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
    ),
});

export const registerSchema = loginSchema.extend({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(30, "Name must be at most 30 characters long"),
});
