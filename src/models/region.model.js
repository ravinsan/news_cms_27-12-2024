import mongoose from "mongoose";

const regionSchema = mongoose.Schema({
    name : {type:String, require:true},
    slug : {type:String},
    parent_id : { type: mongoose.Schema.Types.ObjectId, ref: "Region", default: null },
    frontend_menu_status: { type: Boolean, default: false, comment: "0-Hide, 1-Show" }, 
    page_design_status: { type: Boolean, default: false, comment: "0-Normal, 1-New design" }, 
    status: { type: Boolean, default: true, comment: "0-Inactive, 1-Active" },
    create_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, {timestamps: true});

export default mongoose.model("Region", regionSchema);