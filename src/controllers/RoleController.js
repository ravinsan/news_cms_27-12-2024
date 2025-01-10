import { Role } from "../models/role.model.js";
export const roleIndex = async (req, res)=>{
    try{
        const roles = await Role.find();
        return res.status(200).json({message:"Role has been successfully get.", data:roles});
    }
    catch(err)
    {
     return res.status(500).json({message:"Something wents wrong"});
    }
}

export const roleStore = async (req, res) =>{
    try{
         const {name, status} = req.body;
         const data = {
             name:name,
             status:status,
             create_by:req.user.id,
             updated_by:req.user.id,
         };

         const role = await Role.create(data);
         return res.status(200).json({message:"Role has been successuly saved"});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}

export const roleView = async (req, res) => {
    try{
         const id = req.params.id;
         const role = await Role.findById(id);
         if(!role)
         {
            return res.status(500).json({message:"Role is not found"});
         }
         return res.status(200).json({message:"Role has been successfully get", data:role});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

export const roleUpdate = async (req, res) => {
    try{
        const id = req.params.id;
        const {name, status} = req.body;
        const role = await Role.findById(id);
        role.name = name;
        role.status = status;
        role.updated_by = req.user.id;
        await Role.findByIdAndUpdate(id, role);

        return res.status(200).json({message:"Role has been successfully updated", data:role});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

export const roleDelete = async (req, res) =>{
    try{
         const id = req.params.id;
         const role = await Role.findByIdAndDelete(id);
         if(!role)
         {
            return res.status(500).json({message:"Role has not been found"});
         }
         return res.status(200).json({message:"Role has been successfully deleted!"});
    }
    catch(err)
    {
         return res.status(500).json({message:err.message});
    }
}

export const roleStatusChange = async (req, res) =>{
    try{
          const id = req.params.id;
          const role = await Role.findById(id);
          
          if(!role)
          {
            return res.status(500).json({message:"Role has not been found"});
          }

          if(role.status == true)
          {
             role.status = false;
          }
          else
          {
            role.status = true;
          }
            role.updated_by = req.user.id;
           await Role.findByIdAndUpdate(id, role);
           const data = await Role.findById(id);
           return res.status(200).json({message:"Role has been successfully updated", data:data});
        }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}