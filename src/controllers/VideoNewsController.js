import VideoNews from "../models/videonews.models.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const index = async (req, res) =>{
    try{  
          const vnews = await VideoNews.find();
          if(vnews == '')
          {
            return res.status(400).json({message:"Video news has not been found"});
          }
          const baseUrl = process.env.BASE_URL || 'http://localhost:5000/';
          for(let i = 0; i < vnews.length; i++)
          {
              vnews[i].thumbnail_image = baseUrl + 'video_news/' + vnews[i].thumbnail_image;
          }
          return res.status(200).json({message:"Video news has been successfully get", data:vnews});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

export const store = async (req, res) =>{
    try{
          const {category_id, sub_category_id, region_id, country_region_id, state_region_id, title, url_status, video_url, is_live, status} = req.body;
         const vnews = await VideoNews.create({
                        category_id       : category_id,
                        sub_category_id   : sub_category_id,
                        region_id         : region_id,
                        country_region_id : country_region_id,
                        state_region_id   : state_region_id,
                        title             : title,
                        thumbnail_image   : (req.file && req.file.filename) ? req.file.filename : null,
                        url_status        : url_status,
                        video_url         : video_url,
                        is_live           : is_live,
                        status            : status
                    });
        if(!vnews)
        {
          return res.status(400).json({message:"Data failed"});
        }            
        return res.status(200).json({message:"Video news is successfully stored", data:vnews});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

export const view = async (req, res) =>{
    try{
         const id = req.params.id;
         const vnews = await VideoNews.findById(id);
         if(!vnews)
         {
            return res.status(400).json({message:"Video news has not been found"});
         }
         const baseUrl = process.env.BASE_URL || 'http://localhost:5000/';
         vnews.thumbnail_image = baseUrl + 'video_news/' + vnews.thumbnail_image;
         return res.status(200).json({message:"Video news has been successfully get", data:vnews});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}

export const update = async (req, res) =>{
    try{
          const {category_id, sub_category_id, region_id, country_region_id, state_region_id, title, url_status, video_url, is_live, status} = req.body;
          const id = req.params.id;
          const vnews = await VideoNews.findById(id);
          if(!vnews)
          {
            return res.status(400).json({message:"Video news has not been found"});
          }
          
          // Delete old image
          if (vnews.thumbnail_image) {  
            const oldImagePath = path.join(__dirname, '..', '..', '/uploads/video_news/', vnews.thumbnail_image); 
            if (fs.existsSync(oldImagePath)) {
                try {
                    fs.unlinkSync(oldImagePath);
                    console.log("Old image deleted successfully:", oldImagePath);
                } catch (unlinkError) {
                    console.error("Error deleting old image:", unlinkError);
                }
            } else {
                console.warn("Old image not found, skipping deletion:", oldImagePath);
            }
        }

          vnews.sub_category_id   = sub_category_id;
          vnews.region_id         = region_id;
          vnews.country_region_id = country_region_id;
          vnews.state_region_id   = state_region_id;
          vnews.title             = title;
          vnews.thumbnail_image   = (req.file && req.file.filename) ? req.file.filename : vnews.thumbnail_image;
          vnews.url_status        = url_status;
          vnews.video_url         = video_url;
          vnews.is_live           = is_live;
          vnews.status            = status;
          await vnews.save();
          return res.status(200).json({message:"Video news has been successfully updated", data:vnews});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}

export const destroy = async (req, res) =>{
    try{
         const id = req.params.id;
         const vnews = await VideoNews.findByIdAndDelete(id);
         if(!vnews)
         {
            return res.status(400).json({message:"Video news has not been found"});
         }
         return res.status(200).json({message:"Video news has been successfully deleted"});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}

export const statusChange = async (req, res) =>{
    try{
         const id = req.params.id;
         const vnews = await VideoNews.findById(id);
         if(!vnews)
         {
            return res.status(400).json({message:"Video news has not been found"});
         }
         vnews.status = !vnews.status;
         const vnewsSave = await vnews.save();
         return res.status(200).json({message:"Video news status has been successfully changed", data:vnewsSave});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}

export const liveStatusChange = async (req, res) =>{
    try{
         const id = req.params.id;
         const vnews = await VideoNews.findById(id);
         if(!vnews)
         {
            return res.status(400).json({message:"Video news has not been found"});
         }
         vnews.is_live = !vnews.is_live;
         const vnewsSave = await vnews.save();
         return res.status(200).json({message:"Video news is live has been successfully changed", data:vnewsSave});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}

export const urlStatusChange = async (req, res) =>{
    try{
         const id = req.params.id;
         const vnews = await VideoNews.findById(id);
         if(!vnews)
         {
            return res.status(400).json({message:"Video news has not been found"});
         }
         vnews.url_status = !vnews.url_status;
         const vnewsSave = await vnews.save();
         return res.status(200).json({message:"Video news url status has been successfully changed", data:vnewsSave});
    }
    catch(err)
    {
       return res.status(500).json({message:err.message});
    }
}