import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";
import { newsMenuDelete, newsMenuIndex, newsMenuStatus, newsMenuStore, newsMenuUpdate, newsMenuView } from "../controllers/NewsMenuController.js";
import { newsMenuValidation, newsMenuUpdateValidation } from "../validation/newsMenuValidation.js";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware.js";

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

// News Menu
Route.get("/news-menu", newsMenuIndex);               
Route.get("/news-menu/:id", newsMenuView);            
Route.post("/news-menu/store", upload.single('image'), ValidationMiddleware(newsMenuValidation), newsMenuStore);        
Route.put("/news-menu/update/:id", upload.single('image'), ValidationMiddleware(newsMenuUpdateValidation), newsMenuUpdate);   
Route.delete("/news-menu/delete/:id", newsMenuDelete);
Route.put("/news-menu/status/:id", newsMenuStatus);

export default Route;