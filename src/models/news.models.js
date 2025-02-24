import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    category_id : { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null},
    subcategory_id : { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
    news_menu_id : { type: mongoose.Schema.Types.ObjectId, ref: "NewsMenu", default: null },
    news_submenu_id : { type: mongoose.Schema.Types.ObjectId, ref: "NewsMenu", default: null },
    region_id : { type: mongoose.Schema.Types.ObjectId, ref: "Region", default: null },
    country_region_id : { type: mongoose.Schema.Types.ObjectId, ref: "Region", default: null },
    state_region_id : { type: mongoose.Schema.Types.ObjectId, ref: "Region", default: null },
    title : String,
    slug : String,
    thumbnail_image : String,
    youtube_url_id : String,
    short_description : String,
    description : String,
    is_breaking_news : { type: Boolean, default: false, comment: "1 - Yes, 0 - No"},
    status : { type: Boolean, default: true, comment: "1 - Active, 0 - Inactive"},
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deleted_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, {timestamps: true});

export default mongoose.model("News", newsSchema);