import { check } from "express-validator";
import { Role } from "../models/role.model.js";

export const roleValidation = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  check("status")
    .notEmpty()
    .isIn([0, 1])
    .withMessage("Status must be either 0 (Inactive) or 1 (Active)"),
];

export const roleUpdateValidation = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),
    
  check("status")
    .notEmpty() 
    .isIn([0, 1])
    .withMessage("Status must be either 0 (Inactive) or 1 (Active)"),   
];
