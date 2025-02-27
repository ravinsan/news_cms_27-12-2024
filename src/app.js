import express from "express";
import AuthRoute from "./routes/login.route.js";
import Admin from "./routes/admin.route.js";
import NewsMenu from "./routes/newsmenu.route.js";
import Region from "./routes/region.route.js";
import VideoNews from "./routes/videoNews.route.js";
import News from "./routes/news.route.js";

const app = express();
app.use(express.urlencoded({ extended: true })); //accept request from x-www-form-urlencoded
app.use(express.json()); // for parsing application/json (for geting request data) -> not found json data that's why using this

app.use(express.static('uploads'));
app.use('/api/v1', AuthRoute);
app.use('/api/v1', Admin);
app.use('/api/v1', NewsMenu);
app.use('/api/v1', Region);
app.use('/api/v1', VideoNews);
app.use('/api/v1', News);

// app.use("*", (req, res) => res.status(404).send("Route Not Found"));

export default app;