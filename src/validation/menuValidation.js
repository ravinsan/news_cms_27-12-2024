import { check } from "express-validator";

export const menuValidation = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  check("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required"),

  check("url")
    .trim()
    .notEmpty()
    .withMessage("Url is required"),

  check("status")
    .notEmpty()
    .isIn([0, 1])
    .withMessage("Status must be either 0 (Inactive) or 1 (Active)"),
];

export const menuUpdateValidation = [
    check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  check("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required"),

  check("url")
    .trim()
    .notEmpty()
    .withMessage("Url is required"),

  check("status")
    .notEmpty()
    .isIn([0, 1])
    .withMessage("Status must be either 0 (Inactive) or 1 (Active)"), 
];
