import { check } from "express-validator";

export const videoNewsValidation = [
    check("category_id")
        .trim()
        .notEmpty()
        .withMessage("Category Id is required"),
    
      check("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

      check("video_url")
        .trim()
        .notEmpty()
        .withMessage("Video Url is required"),
    
      check("status")
        .notEmpty()
        .isIn([0, 1])
        .withMessage("Status must be either 0 (Inactive) or 1 (Active)"),
];