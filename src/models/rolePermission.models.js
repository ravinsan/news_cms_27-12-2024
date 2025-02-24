import mongoose from "mongoose";

const rolePermissionSchema = new mongoose.Schema({
    role_id:{type:mongoose.Schema.Types.ObjectId, ref: "Role"},
    permission_id:{type:mongoose.Schema.Types.ObjectId, ref: "Permission"},
}, {timestamps: true});

export const RolePermission = mongoose.model("RolePermission", rolePermissionSchema);