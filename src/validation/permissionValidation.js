import { check } from "express-validator";

export const permissionValidation = [
  check("menu_id")
    .trim()
    .notEmpty()
    .withMessage("Please select a menu"),

  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  check("url")
    .trim()
    .notEmpty()
    .withMessage("Url is required"),

  check("status")
    .notEmpty()
    .isIn([0, 1])
    .withMessage("Status must be either 0 (Inactive) or 1 (Active)"),
];

export const permissionUpdateValidation = [
  check("menu_id")
    .trim()
    .notEmpty()
    .withMessage("Please select a menu"),

  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  check("url")
    .trim()
    .notEmpty()
    .withMessage("Url is required"),

  check("status")
    .notEmpty()
    .isIn([0, 1])
    .withMessage("Status must be either 0 (Inactive) or 1 (Active)"),
];
