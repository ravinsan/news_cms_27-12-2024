import Region from "../models/region.model.js";

/* Region List */ 
export const index = async (req, res)=>{
    try{
          const region = await Region.find();
          return res.status(200).json({message:"Region has been successfully get", data:region});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}

/* Region Store */
export const store = async (req, res)=>{
    try{
         const {name, slug, parent_id, status, frontend_menu_status, page_design_status} = req.body;
         const region = await Region.create({
                name : name,
                slug : slug,
                parent_id : (parent_id && parent_id !== '') ? parent_id : null,
                frontend_menu_status : frontend_menu_status,
                status : status,
                created_by : req.user.id,
                updated_by : req.user.id,
         });

         if(!region)
         {
            return res.status(400).json({message:"Data Failed"});
         }
         return res.status(200).json({message:"Region has been successfully saved"});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}

/* Region View */
export const view = async (req, res)=>{
    try{
          const id = req.params.id;
          const region = await Region.findById(id);
          if(!region)
          {
            return res.status(400).json({message:"Region has not been found"});
          }
          return res.status(200).json({message:"Region has been successfully get", data:region});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}

/* Region Update */
export const update = async (req, res)=>{
    try{
        const {name, slug, parent_id, status, frontend_menu_status, page_design_status} = req.body;
        const id = req.params.id;
        const region = await Region.findById(id);
        region.name = name;
        region.slug = slug;
        region.parent_id = (parent_id && parent_id !== '') ? parent_id : null;
        region.frontend_menu_status = frontend_menu_status;
        region.page_design_status = page_design_status;
        region.status = status;
        const regions = await region.save();
        return res.status(200).json({message:"Region has been successfully updated", data:regions});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}

/* Region Destroy */
export const destroy = async (req, res)=>{
    try{
         const id = req.params.id;
         const region = await Region.findByIdAndDelete(id);
         if(!region)    
         {
            return res.status(400).json({message:"Region has not been found"});
         }
         return res.status(200).json({message:"Region has been successfully deleled"});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}

/* Region Status Change */
export const statusChange = async (req, res)=>{
    try{
         const id = req.params.id;
         const region = await Region.findById(id);
         if(!region)
         {
            return res.status(400).json({message:"Region has not been found"});
         }
         region.status = !region.status;
         const regions = await region.save();
         return res.status(200).json({message:"Region status has been successfully changed", data:regions});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}