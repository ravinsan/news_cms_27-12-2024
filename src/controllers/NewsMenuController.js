import NewsMenu from "../models/newsmenu.models.js";

// News menu list
export const newsMenuIndex = async (req, res) => {
   try{
           let newsMenu = await NewsMenu.find();
           return res.status(200).json({"message":"News menu has been successfully get.", data:newsMenu});
   }
   catch(err)
   {
     return res.status(500).json({message:err.message});
   }
}

// News menu store
export const newsMenuStore = async (req, res)=>
{       
   const {name, slug, parent_id, mega_menu_status, frontend_menu_status, page_design_status, status} = req.body;
   try{
       const newsmenu = await NewsMenu.create({
               name:name,
               slug:slug,
               parent_id: (parent_id && parent_id !==null) ? parent_id : null,
               image:(req.file && req.file.filename) ? req.file.filename : null,
               mega_menu_status : mega_menu_status,
               frontend_menu_status : frontend_menu_status,
               page_design_status : page_design_status,
               status : status,
               created_by : req.user.id,
               updated_by : req.user.id
       });

       if(!newsmenu)
       {
         return res.status(400).json({message:"Data Failed"});
       }

       return res.status(200).json({message:"News menu has been successfully stored"});
   }
   catch(err)
   {
      return res.status(500).json({message:err.message});
   }
}

// News menu view
export const newsMenuView = async (req, res) =>{
   try{
        const id = req.params.id;
        const newsmenu = await NewsMenu.findById(id);
        if(!newsmenu)
        {
          return res.status(400).json({message:"News menu has not been found"});
        }
        return res.status(200).json({message:"News menu has been successfully get", data:newsmenu});
   }
   catch(err)
   {
      return res.status(500).json({message:err.message});
   }
}

export const newsMenuUpdate = async (req, res) =>{
   try{
        const id = req.params.id;
        const newsmenu = await NewsMenu.findById(id);
        if(!newsmenu)
        {
           return res.status(400).json({message:"News menu has not been found"});
        }

        newsmenu.name = name;
        newsmenu.slug = slug;
        newsmenu.parent_id = (parent_id && parent_id !==null) ? parent_id : null;
        if(req.file && req.file.filename)
        {
            category.image = req.file.filename;
        }
        newsmenu.mega_menu_status = mega_menu_status;
        newsmenu.frontend_menu_status = frontend_menu_status;
        newsmenu.page_design_status = page_design_status;
        newsmenu.status = status;
        newsmenu.updated_by = req.user.id;
        await newsmenu.save();
      return res.status(200).json({message:"Category has been successfully updated."});
   }
   catch(err)
   {
     return res.status(500).json({message:err.message});
   }
}

export const newsMenuDelete = async (req, res) => {
   try{
        const id = req.params.id;
        const newsmenu = await NewsMenu.findByIdAndUpdate(id);
        if(!newsmenu)
        {
         return res.status(400).json({message:"News menu has not found"});
        }

        return res.status(200).json({message:"News menu has been successfully deleted"});
   }
   catch(err)
   {
      return res.status(500).json({message:err.message});
   }
}

export const newsMenuStatus = async (req, res) => {
   try{
        const id = req.params.id;
        const newsmenu = await NewsMenu.findById(id);
        if(!newsmenu)
        {
            return res.status(400).json({message:"News menu has not been found"});
        }
        newsmenu.status = !newsmenu.status;
        await newsmenu.save();
        return res.status(200).json({message:"News menu status has been successfully changed"});
   }
   catch(err)
   {
      return res.status(500).json({message:err.message});
   }
}
