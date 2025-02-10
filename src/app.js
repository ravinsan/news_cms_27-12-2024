import express from "express";
import AuthRoute from "./routes/login.route.js";
import Admin from "./routes/admin.route.js";
import NewsMenu from "./routes/newsmenu.route.js";

const app = express();
app.use(express.urlencoded({ extended: true })); //accept request from x-www-form-urlencoded
app.use(express.json()); // for parsing application/json (for geting request data) -> not found json data that's why using this

app.use(express.static('uploads'));
app.use('/api/v1', AuthRoute);
app.use('/api/v1', Admin);
app.use('/api/v1', NewsMenu);

// app.use("*", (req, res) => res.status(404).send("Route Not Found"));

export default app;