import mongoose from "mongoose"

const newsmenuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: false, default: null }, 
    mega_menu_status: { type: Boolean, default: true, comment: "0-Horizontal, 1-Vertical" }, 
    status: {type:Boolean, default: true},
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deleted_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, {timestamps: true});

export default mongoose.model("NewsMenu", newsmenuSchema);