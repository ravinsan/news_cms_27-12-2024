import Category from "../models/category.model.js"

export const categoryIndex = async (req, res) => {
   try {
        const category = await Category.find();
        const baseUrl = process.env.BASE_URL || 'http://localhost:5000/'; 
        const formattedBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';

        for (let i = 0; i < category.length; i++) {
            category[i].image = formattedBaseUrl + 'category/' + category[i].image;
        }
       
       return res.status(200).json({ message: "Category has been successfully retrieved.", data: category });
   } catch (err) {
       return res.status(500).json({ message: err.message });
   }
}


export const categorytore = async (req, res)=>{
    try{
      // console.log(req.body);
        const {name, slug, parent_id, mega_menu_status, frontend_menu_status, page_design_status, status} = req.body;
        const category = await Category.create({
                                name:name,
                                slug:slug,
                                parent_id:(parent_id && parent_id !== null) ? parent_id : null,
                                image:(req.file && req.file.filename) ? req.file.filename : null,
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
         const baseUrl = process.env.BASE_URL || 'http://localhost:5000/'; 
         category.image = baseUrl + 'category/' + category.image;
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
         category.parent_id = (parent_id && parent_id !== null) ? parent_id : null;
         if(req.file && req.file.filename)
         {
            category.image = req.file.filename;
         }
         category.mega_menu_status = mega_menu_status;
         category.frontend_menu_status = frontend_menu_status;
         category.page_design_status = page_design_status;
         category.status = status;
         category.updated_by = req.user.id;
         await category.save();
         return res.status(200).json({message:"Category has been successfully updated."});
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
        await category.save();
        return res.status(200).json({message:"Category status has been successfully changed"});

    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}