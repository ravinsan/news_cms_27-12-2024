import mongoose from "mongoose";

const videonewsSchema = new mongoose.Schema({
    category_id:{type:mongoose.Schema.Types.ObjectId, ref: "Category"},
    sub_category_id:{type:mongoose.Schema.Types.ObjectId, ref: "Category"},
    region_id:{type:mongoose.Schema.Types.ObjectId, ref: "Region"},
    country_region_id:{type:mongoose.Schema.Types.ObjectId, ref: "Region"},
    state_region_id:{type:mongoose.Schema.Types.ObjectId, ref: "Region"},
    title:{type:String, required:true},
    thumbnail_image:String,
    video_url:String,
    url_status:{ type: Boolean, default: true, comment: "0-Other, 1-Youtube" },
    is_live:{ type: Boolean, default: true, comment: "0-No, 1-Yes" },
    status:{ type: Boolean, default: true, comment: "0-Inactive, 1-Active" },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("VideoNews", videonewsSchema);