import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware.js";
import { regionValidation } from "../validation/regionValidation.js";
import { destroy, index, statusChange, store, update, view } from "../controllers/RegionController.js";

const Route = Router();

/* Start Authmiddleware scope */
Route.use(AuthMiddleware);

/* Region Route */
Route.get('/region', index);
Route.post('/region/store', ValidationMiddleware(regionValidation), store);
Route.get('/region/:id', view); 
Route.put('/region/update/:id', ValidationMiddleware(regionValidation), update);
Route.delete('/region/:id', destroy);
Route.put('/region/status-change/:id', statusChange);

export default Route;