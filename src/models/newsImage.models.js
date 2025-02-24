import mongoose from "mongoose";

const newsImageSchema = new mongoose.Schema({
    news_id : { type: mongoose.Schema.Types.ObjectId, ref: "News", default: null},
    image : String,
    image_url : String,
}, {timestamps:true});

export default mongoose.model("NewsImage", newsImageSchema);