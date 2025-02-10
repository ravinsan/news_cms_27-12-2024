import {Router} from "express";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";
import { userDelete, userIndex, userStatus, userStore, userUpdate, userView } from "../controllers/UserController.js";
import { roleDelete, roleIndex, roleStatusChange, roleStore, roleUpdate, roleView } from "../controllers/RoleController.js";
import { permissionDelete, permissionIndex, permissionStore, permissionStatusChange, permissionUpdate, permissionView } from "../controllers/PermissionController.js";
import { menuDelete, menuIndex, menuStore, menuStatusChange, menuUpdate, menuView } from "../controllers/MenuController.js";
import { categoryDelete, categoryIndex, categoryStatusChange, categorytore, categoryUpdate, categoryView } from "../controllers/CategoryController.js";
import { userUpdateValidation, userValidation } from "../validation/userValidation.js";
import { roleUpdateValidation, roleValidation } from "../validation/roleValidation.js";
import { menuUpdateValidation, menuValidation } from "../validation/menuValidation.js";
import { permissionValidation, permissionUpdateValidation } from "../validation/permissionValidation.js";
import { categoryValidation, categoryUpdateValidation } from "../validation/categoryValidation.js";

// Multer setup for file uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // let folderName = req.body.folder || "default"; 
        let folderName = req.query.fd || "default";
        // Remove trailing slash if present
        folderName = folderName.replace(/\/$/, "");

        const uploadPath = path.join(__dirname, "..", "..", "uploads", folderName);

        console.log("Uploading to:", uploadPath); // Debugging ke liye


        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage: storage });


const Route = Router();

/* Start Authmiddleware scope */
Route.use(AuthMiddleware);

// Users
Route.get("/users", userIndex);               
Route.get("/users/:id", userView);            
Route.post("/users/store", upload.single('image'), ValidationMiddleware(userValidation), userStore);        
Route.put("/users/update/:id", upload.single('image'), ValidationMiddleware(userUpdateValidation), userUpdate);   
Route.delete("/users/delete/:id", userDelete);
Route.put("/users/status/:id", userStatus);

// Roles
Route.get("/roles", roleIndex);
Route.post("/roles/store", ValidationMiddleware(roleValidation), roleStore);
Route.get("/roles/:id", roleView);
Route.put("/roles/:id", ValidationMiddleware(roleUpdateValidation), roleUpdate);
Route.delete("/roles/:id", roleDelete);
Route.put("/roles/status/:id", roleStatusChange);

// Menu
Route.get("/menu", menuIndex);
Route.post("/menu/store", ValidationMiddleware(menuValidation), menuStore);
Route.get("/menu/:id", menuView);
Route.put("/menu/:id", ValidationMiddleware(menuUpdateValidation), menuUpdate);
Route.delete("/menu/:id", menuDelete);
Route.put("/menu/status/:id", menuStatusChange);

// Permission
Route.get("/permissions", permissionIndex);
Route.post("/permissions/store", ValidationMiddleware(permissionValidation), permissionStore);
Route.get("/permissions/:id", permissionView);
Route.put("/permissions/:id",  ValidationMiddleware(permissionUpdateValidation), permissionUpdate);
Route.delete("/permissions/:id", permissionDelete);
Route.put("/permissions/status/:id", permissionStatusChange);

// Category
Route.get("/category", categoryIndex);
Route.post("/category/store", upload.single('image'), ValidationMiddleware(categoryValidation), categorytore);
Route.get("/category/:id", categoryView);
Route.put("/category/:id", upload.single('image'), ValidationMiddleware(categoryUpdateValidation), categoryUpdate);
Route.delete("/category/:id", categoryDelete);
Route.put("/category/status/:id", categoryStatusChange);
/* End Authmiddleware scope*/

export default Route;