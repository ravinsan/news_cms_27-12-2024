import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    menu_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true }, 
    sub_menu_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: false, default: null }, 
    name:{ type: String, required: true },
    url:String,
    guard_name:String,
    status: {type:Boolean, default: true},
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deleted_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, {timestamps: true});

export default mongoose.model("Permission", permissionSchema);