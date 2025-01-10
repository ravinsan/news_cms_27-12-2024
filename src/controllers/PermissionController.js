import mongoose from "mongoose";
import Permission from "../models/permission.model.js";

export const permissionIndex = async (req, res) =>{
   try{
         const permission = await Permission.find();
         return res.status(200).json({message:"Permission has been successfully get.", data:permission});
   }
   catch(err){
       return res.status(500).json({message:err.message});
   }
}

export const permissionStore = async (req, res) =>{
  try{
       const { menu_id, sub_menu_id, name, url, guard_name, status } = req.body;

       if (!mongoose.Types.ObjectId.isValid(menu_id)) {
            return res.status(400).json({ message: "Invalid menu_id" });
        }
        const permission = await Permission.create({
                                menu_id:menu_id,
                                sub_menu_id:sub_menu_id,
                                name:name,
                                url:url,
                                guard_name:guard_name,
                                status:status,
                                created_by:req.user.id,
                                updated_by:req.user.id,
                            });
        return res.status(200).json({message:"Permission has been successfully saved"});
  }
  catch(err)
  {
    return res.status(500).json({message:err.message});
  }
}

export const permissionView = async (req, res) =>{
   try{
       const id = req.params.id;
       const permission = await Permission.findById(id);
       if(!permission)
       {
        return res.status(400).json({message:"Permission has not been found"});
       }
       return res.status(200).json({message:"Permission has been successfully get.", data:permission});
   }
   catch(err)
   {
      return res.status(500).json({message:err.message});
   }
}

export const permissionUpdate = async (req, res) =>{
   try{
      const { menu_id, sub_menu_id, name, url, guard_name, status } = req.body;
      const id = req.params.id;
      const permission = await Permission.findById(id);
      if(!permission)
      {
        return res.status(400).json({message:"Permission has not been found."});
      }

      if (!mongoose.Types.ObjectId.isValid(menu_id)) {
        return res.status(400).json({ message: "Invalid menu_id" });
      }
      permission.name = name;
      permission.menu_id = menu_id;
      permission.sub_menu_id = sub_menu_id;
      permission.url = url;
      permission.guard_name = guard_name;
      permission.status = status;
      await permission.save();
      return res.status(200).json({message:"Permission has been successfully updated"});
   }
   catch(err)
   {
     return res.status(500).json({message:err.message});
   }
}

export const permissionDelete = async (req, res) =>{
  try{
      const id = req.params.id;
      const permission = await Permission.findByIdAndDelete(id);
      if(!permission)
      {
        return res.status(400).json({message:"Permission has not found."});
      }
      return res.status(200).json({message:"Permission has been successfully deleted."});
  }
  catch(err)
  {
    return res.status(500).json({message:err.message});
  }
}

export const permissionStatusChange = async (req, res) =>{
   try{
        const id = req.params.id;
        const permission = await Permission.findById(id);
        if(!permission)
        {
          return res.status(400).json({message:"Permission has not been found"});
        }
        permission.status = !permission.status;
        await Permission.findByIdAndUpdate(id, permission);
        const data = await Permission.findById(id); 
        return res.status(200).json({message:"Permission status has been successfully saved", data:data});
   }
   catch(err)
   {
       return res.status(500).json({message:err.message});
   }
}