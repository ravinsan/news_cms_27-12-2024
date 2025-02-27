import News from "../models/news.models.js"
import slugify from "slugify";

export const index = async (req, res)=>{
    try{
         const news = await News.find();
         if(news=='')
         {
            return res.status(400).json({message:"No news data available"});
         }

         const baseUrl = process.env.BASE_URL || 'http://localhost:5000/'; 

        for (let i = 0; i < news.length; i++) {
            news[i].thumbnail_image = baseUrl + 'news/' + news[i].thumbnail_image;
        }

         return res.status(200).json({message:"News are successfully get", data:news});
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
}

export const store = async (req, res)=>{
    try{
         const {category_id, subcategory_id, news_menu_id, news_submenu_id, region_id, country_region_id, state_region_id, title, slug, youtube_url_id, short_description, description, is_breaking_news, status} = req.body;
         const slugable = await generateUniqueSlug(title);
         const news = await News.create({
            category_id      : category_id, 
            subcategory_id   : subcategory_id, 
            news_menu_id     : news_menu_id, 
            news_submenu_id  : news_submenu_id, 
            region_id        : region_id, 
            country_region_id: country_region_id, 
            state_region_id  : state_region_id, 
            title            : title, 
            slug             : slugable ? slugable : slug, 
            thumbnail_image  : (req.file && req.file.filename) ? req.file.filename : null, 
            youtube_url_id   : youtube_url_id, 
            short_description: short_description, 
            description      : description, 
            is_breaking_news : is_breaking_news, 
            status           : status,
            created_by       : req.user.id,
            updated_by       : req.user.id     
         });

         return res.status(200).json({message:"News is successfully stored"});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

export const view = async (req, res)=>{
    try{
         const id = req.params.id;
         const news = await News.findById(id);
         if(!news)
         {
            return res.status(400).json({message:"News has not been found"});
         }

         const baseUrl = process.env.BASE_URL || 'http://localhost:5000/'; 
         if(news.thumbnail_image && news.thumbnail_image !== null)
         {
            news.thumbnail_image = baseUrl + 'news/' + news.thumbnail_image;
         }

         return res.status(200).json({message:"News has been successfully get", data:news});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

export const update = async (req, res)=>{
    try{
         const {category_id, subcategory_id, news_menu_id, news_submenu_id, region_id, country_region_id, state_region_id, title, slug, youtube_url_id, short_description, description, is_breaking_news, status} = req.body;
         const id   = req.params.id;
         const news = await News.findById(id);
         if(!news)
         {
            return res.status(400).json({message:"News has not been found"});
         }

         // Check if title changed
        let newSlug = news.slug;
        if (title !== news.title) {
            newSlug = await generateUniqueSlug(title, id);
        }

         news.category_id       = (category_id && category_id !==null) ? category_id : null;
         news.subcategory_id    = (subcategory_id && subcategory_id !==null) ? subcategory_id : null;
         news.news_menu_id      = (news_menu_id && news_menu_id !==null) ? news_menu_id : null;
         news.news_submenu_id   = (news_submenu_id && news_submenu_id !==null) ? news_submenu_id : null;
         news.region_id         = (region_id && region_id !==null) ? region_id : null;
         news.country_region_id = (country_region_id && country_region_id !==null) ? country_region_id : null;
         news.state_region_id   = (state_region_id && state_region_id !==null) ? state_region_id : null;
         news.title             = title;
         news.slug              = newSlug;
         news.thumbnail_image   = (req.file && req.file.filename) ? req.file.filename : news.thumbnail_image;
         news.youtube_url_id    = youtube_url_id;
         news.short_description = short_description;
         news.is_breaking_news  = is_breaking_news;
         news.status            = status;
         await news.save();
         return res.status(200).json({message:"News has been successfully updated"});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

export const destroy = async (req, res)=>{
    try{
         const id = req.params.id;
         const news = await News.findByIdAndDelete(id);
         if(!news)
         {
            return res.status(400).json({message:"News has not been deleted"});
         }
         return res.status(200).json({message:"News has been successfully deleted"});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

export const statusChange = async (req, res)=>{
    try{
        const id = req.params.id;
        const news = await News.findById(id);
        if(!news)
        {
           return res.status(400).json({message:"News has not been deleted"});
        }
        news.status = !news.status;
        const savenews = await news.save();
        return res.status(200).json({message:"News status has been successfully changed", data:savenews});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

export const breakingNewsStatusChange = async (req, res)=>{
    try{
        const id = req.params.id;
        const news = await News.findById(id);
        if(!news)
        {
           return res.status(400).json({message:"News has not been deleted"});
        }
        news.is_breaking_news = !news.is_breaking_news;
        const savenews = await news.save();
        return res.status(200).json({message:"Breaking news status has been successfully changed", data:savenews});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

const generateUniqueSlug = async (title) => {
    let baseSlug = slugify(title, { 
        lower: true, 
        strict: true, 
        locale: 'en'
    });

    let slug = baseSlug;
    let count = 1;

    // Check if the slug exists in the database
    while (await News.findOne({ slug })) {
        slug = `${baseSlug}-${count}`;
        count++;
    }

    return slug;
};