import Category from "../models/category.model.js"

export const categoryIndex = async (req, res)=>{
   try{
        const category = await Category.find();
        return res.status(200).json({message:"Category has been successfully get.", data:category});
   }
   catch(err)
   {
    return res.status(500).json({message:err.message});
   }
}

export const categorytore = async (req, res)=>{
    try{
        const {name, slug, parent_id, mega_menu_status, frontend_menu_status, page_design_status, status} = req.body;
        const category = Category.create({
                                name:name,
                                slug:slug,
                                parent_id:parent_id,
                                image:req.file.filename,
                                mega_menu_status:mega_menu_status,
                                frontend_menu_status:frontend_menu_status,
                                page_design_status:page_design_status,
                                status:status,
                                create_by:req.user.id,
                                updated_by:req.user.id
                            });
            if(!category)
            {
               return res.status(400).json({message:"Data failed"});
            }                    
            return res.status(200).json({message:"Category has been successfully saved"});
   }
   catch(err)
   {
     return res.status(500).json({message:err.message});
   }
}

export const categoryView = async (req, res)=>{
    try{
         const id = req.params.id;
         const category = await Category.findById(id);
         if(!category)
         {
            return res.status(400).json({message:"Category has not been found"});
         }
         return res.status(200).json({message:"Category has been successfully get", data:category});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

export const categoryUpdate = async (req, res)=>{
    try{
         const id = req.params.id;
         const {name, slug, parent_id, mega_menu_status, frontend_menu_status, page_design_status, status} = req.body;
         const category = await Category.findById(id);
         if(!category)
         {
            return res.status(400).json({message:"Category has not been found."});
         }
         category.name = name;
         category.slug = slug;
         category.parent_id = parent_id;
         if(req.file && req.file.filename)
         {
            category.image = req.file.filename;
         }
         category.mega_menu_status = mega_menu_status;
         category.frontend_menu_status = frontend_menu_status;
         category.page_design_status = page_design_status;
         category.status = status;
         category.updated_by = req.user.id;
         await Category.save();
         return res.status(200).json({message:"Category has been successfully get."});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}

export const categoryDelete = async (req, res)=>{
    try{
         const id = req.params.id;
         const category = await Category.findByIdAndDelete(id);
         if(!category)
         {
            return res.status(400).json({message:"Category has not been found."});
         }
         return res.status(200).json({message:"Category has been successfully deleted"});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}

export const categoryStatusChange = async (req, res)=>{
    try{
        const id = req.params.id;
        const category = await Category.findById(id);
        if(!category)
        {
            return res.status(400).json({message:"Category has not been found"});
        }
        category.status = !category.status;
        await Category.save();
        return res.status(200).json({message:"Category status has been successfully changed"});

    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}