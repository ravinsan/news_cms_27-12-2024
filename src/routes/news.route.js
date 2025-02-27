import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware.js";
import { videoNewsValidation } from "../validation/videoNewsValidation.js";
import multer from "multer";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { breakingNewsStatusChange, destroy, index, statusChange, store, update, view } from "../controllers/NewsController.js";

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

        console.log("Uploading to:", uploadPath);


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

/* News Route */
Route.get('/news', index);
Route.post('/news/store', upload.single('thumbnail_image'), store);
Route.get('/news/:id', view); 
Route.put('/news/update/:id', upload.single('thumbnail_image'), update);
Route.delete('/news/:id', destroy);
Route.put('/news/status-change/:id', statusChange);
Route.put('/news/breaking-news-status-change/:id', breakingNewsStatusChange);

export default Route;