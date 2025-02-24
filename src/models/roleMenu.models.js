import mongoose from "mongoose";

const roleMenuSchema = new mongoose.Schema({
    role_id:{type:mongoose.Schema.Types.ObjectId, ref: "Role"},
    menu_id:{type:mongoose.Schema.Types.ObjectId, ref: "Menu"},
    is_parent:{type:Boolean, default: true, comment: "0-Inactive, 1-Active"},
}, {timestamps: true});

export const RoleMenu = mongoose.model("RoleMenu", roleMenuSchema);