import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    url: String,
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: false, default: null }, 
    order_id: Number,
    icon_code: String,
    status: {type:Boolean, default: true},
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deleted_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Menu", menuSchema);
