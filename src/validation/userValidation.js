import { z } from "zod";

export const userValidation = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(150, { message: "Name must be at most 150 characters" }),

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

    mobile: z
        .string({ required_error: "Mobile is required" })
        .trim()
        .min(10, { message: "Mobile must be at least 10 characters" })
        .max(10, { message: "Mobile must be at most 10 characters" }),

    role_id: z
        .string({ required_error: "Role is required" })
        .trim()
        .min(10, { message: "Role must be at least 10 characters" })
        .max(10, { message: "Role must be at most 10 characters" }),

    reporting_head_id: z
        .optional(),

    reporting_user_id: z
        .optional(),

    image: z
        .optional(),

    status: z.number({ required_error: "status is required" }),
});
