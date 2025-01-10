import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    parent_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: false, default: null },
    image: String,
    mega_menu_status: {type:Boolean, default: true, comment: "0-Horizontal, 1-Vertical"}, 
    frontend_menu_status: {type:Boolean, default: false, comment: "0-Hide, 1-Show"}, 
    page_design_status: {type:Boolean, default: false, comment: "0-Normal, 1-New design"}, 
    status: {type:Boolean, default: true, comment: "0-Inactive, 1-Active"},
    create_by:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    updated_by:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
})

export default mongoose.model("Category", categorySchema);