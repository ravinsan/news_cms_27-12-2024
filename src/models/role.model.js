import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    status: {type:Boolean, default: true},
    create_by:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    updated_by:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
}, {timestamps: true}); 

export const Role = mongoose.model("Role", roleSchema);
