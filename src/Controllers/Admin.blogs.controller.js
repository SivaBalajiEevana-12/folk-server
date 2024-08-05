const adminBlogs = require("../Models/Admin.blogs.model");
const uploadToWebSpaceKit = require('../middlewares/uploadToWebSpaceKit'); // Adjust path as necessary
const fs = require('fs');

const adminBlogsController ={
    getData: async(req,res)=>{
      
       try {
        const data =await  adminBlogs.find().sort({ createdAt: -1 });
        return res.status(200).send({message:"success", data});
       } catch (error) {
        return res.status(500).send({message:"error", error});
       }
    },
    singleData: async(req,res)=>{
        try {
         const data =await  adminBlogs.findById(req.params.id);
         return res.status(200).send({message:"success", data:data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     postData: async(req,res)=>{
        try {
         const images = req.files; 
        const imageUrls = [];
        console.log(images)
  
        // Process each file
        for (const image of images) {
          const filePath = image.path;
          const fileName = image.filename;
  
          await new Promise((resolve, reject) => {
            uploadToWebSpaceKit(filePath, fileName, (err, result) => {
              if (err) {
                reject(err);
              } else {
                imageUrls.push(result.url); 
                resolve();
              }
            });
          });
  
         
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error('Error deleting local file:', unlinkErr);
            }
          });
        }
         const data =await  adminBlogs.create({
            date:req.body.date,
            title:req.body.title,
            description:req.body.description,
            img:imageUrls
         });
         return res.status(200).send({message:"post success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     patchData: async(req,res)=>{
        try {
         const data =await  adminBlogs.findByIdAndUpdate(req.params.id, req.body, {new:true});
         return res.status(200).send({message:"updated success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     deleteData: async(req,res)=>{
        try {
         const data =await  adminBlogs.findByIdAndDelete(req.params.id);
         return res.status(200).send({message:"delete success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     }
}


module.exports = adminBlogsController;