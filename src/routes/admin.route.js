import {Router} from "express";
import { userDelete, userIndex, userStatus, userStore, userUpdate, userView } from "../controllers/UserController.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import multer from "multer";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware.js";
import { userValidation } from "../validation/userValidation.js";

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });


const Route = Router();

/* Start Authmiddleware scope */
Route.use(AuthMiddleware);

// Group all user-related routes
Route.get("/users", userIndex);               
Route.get("/users/:id", userView);            
Route.post("/users/store", upload.single('image'), ValidationMiddleware(userValidation), userStore);        
Route.put("/users/update/:id", upload.single('image'), userUpdate);   
Route.delete("/users/delete/:id", userDelete);
Route.get("/users/status/:id", userStatus);

/* End Authmiddleware scope*/

export default Route;