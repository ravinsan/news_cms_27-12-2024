
import Menu from "../models/menu.model.js";

export const menuIndex = async (req, res) =>{
   try{
        const menu = await Menu.find();
        return res.status(200).json({message:"Menu is successfully get.", data:menu});
   }
   catch(err)
   {
      return res.status(500).json({message:err.message});
   }
}

export const menuStore = async (req, res) =>{
    try{
          const {name, slug, url, parent_id, order_id, icon_code, status} = req.body;
          const menu = await Menu.create({ 
                                    name:name, 
                                    slug:slug, 
                                    url:url, 
                                    parent_id:parent_id, 
                                    order_id:order_id, 
                                    icon_code:icon_code, 
                                    status:status, 
                                    created_by:req.user.id, 
                                    updated_by:req.user.id 
                                });
        return res.status(200).json({message:"Menu has been successfully saved"});                
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}

export const menuView = async (req, res) =>{
    try{
         const id = req.params.id;
         const menu = await Menu.findById(id);
         if(!menu)
         {
            return res.status(400).json({message:"Menu has not been found"});
         }
         return res.status(200).json({message:"Menu has been successfully saved", data:menu});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}

export const menuUpdate = async (req, res) =>{
    try{
        const { name, slug, url, parent_id, order_id, icon_code, status } = req.body;
        const id = req.params.id;
        const menu = await Menu.findById(id);
        if(!menu)
        {
            return res.status(400).json({message:"Menu has not been found."});
        }
        menu.name = name;
        menu.slug = slug;
        menu.url = url;
        menu.parent_id = parent_id;
        menu.order_id = order_id;
        menu.icon_code = icon_code;
        menu.status = status;
        menu.created_by = req.user.id;
        menu.updated_by = req.user.id;
        await Menu.findByIdAndUpdate(id, menu);
        return res.status(200).json({message:"Menu has been successfully updated"});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

export const menuDelete = async (req, res) =>{
    try{
         const id = req.params.id;
         const menu = await Menu.findByIdAndDelete(id);
         if(!menu)
         {
            return res.status(400).json({message:"Menu is not found."});
         }
         return res.status(200).json({message:"Menu has been successfully deleted"});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

export const menuStatusChange = async (req, res) =>{
    try{
        const id = req.params.id;
        const menu = await Menu.findById(id);
        if(!menu)
        {
            return res.status(400).json({message:"Menu is not found"});
        }
        menu.status = !menu.status;
        await Menu.findByIdAndUpdate(id, menu);
        const data = await Menu.findById(id);
        return res.status(200).json({message:"Menu status has been successfully changed", data:data});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}