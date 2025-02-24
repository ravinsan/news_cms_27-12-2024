import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware.js";
import { videoNewsValidation } from "../validation/videoNewsValidation.js";
import { index, store, update, view, destroy, statusChange, urlStatusChange, liveStatusChange  } from "../controllers/VideoNewsController.js";
import multer from "multer";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

/* Video News Route */
Route.get('/video-news', index);
Route.post('/video-news/store', upload.single('thumbnail_image'), ValidationMiddleware(videoNewsValidation), store);
Route.get('/video-news/:id', view); 
Route.put('/video-news/update/:id', upload.single('thumbnail_image'), ValidationMiddleware(videoNewsValidation), update);
Route.delete('/video-news/:id', destroy);
Route.put('/video-news/status-change/:id', statusChange);
Route.put('/video-news/url-status-change/:id', urlStatusChange);
Route.put('/video-news/live-status-change/:id', liveStatusChange);

export default Route;