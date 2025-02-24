import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import { newsMenuDelete, newsMenuIndex, newsMenuStatus, newsMenuStore, newsMenuUpdate, newsMenuView } from "../controllers/NewsMenuController.js";
import { newsMenuValidation, newsMenuUpdateValidation } from "../validation/newsMenuValidation.js";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware.js";

const Route = Router();

/* Start Authmiddleware scope */
Route.use(AuthMiddleware);

// News Menu
Route.get("/news-menu", newsMenuIndex);               
Route.get("/news-menu/:id", newsMenuView);            
Route.post("/news-menu/store", ValidationMiddleware(newsMenuValidation), newsMenuStore);        
Route.put("/news-menu/update/:id", ValidationMiddleware(newsMenuUpdateValidation), newsMenuUpdate);   
Route.delete("/news-menu/delete/:id", newsMenuDelete);
Route.put("/news-menu/status/:id", newsMenuStatus);

export default Route;