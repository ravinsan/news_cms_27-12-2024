import { z } from "zod";

export const ValidationMiddleware = (schema) => async (req, res, next) => {
  try {
    // Validate the request body
    console.log(req.body);
    const parsedBody = await schema.parseAsync(req.body);

    // Validate the uploaded file (if required)
    if (schema.shape.image && req.file) {
      const fileValidation = schema.shape.image.safeParse(req.file);
      if (!fileValidation.success) {
        throw fileValidation.error;
      }
    }

    // Attach the validated body to the request
    req.body = parsedBody;
    next();
  } catch (err) {
    // Handle validation errors
    const message =
      err.errors?.[0]?.message || "Validation failed. Check your input.";
    return res.status(400).json({ message });
  }
};
