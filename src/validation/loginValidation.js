import { z } from "zod";

export const loginValidation = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(4, { message: "Email must be at least 4 characters" })
    .max(150, { message: "Email must be at most 150 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must be at most 100 characters" }),
});
