const adminGalleryControl = require("../Models/Admin.gallery.model");
const uploadToWebSpaceKit = require('../middlewares/uploadToWebSpaceKit'); // Adjust path as necessary
const fs = require('fs');

const adminGalleryController ={
    getData: async(req,res)=>{
      
       try {
        const data =await  adminGalleryControl.find().sort({ createdAt: -1 });
        return res.status(200).send({message:"success", data});
       } catch (error) {
        return res.status(500).send({message:"error", error});
       }
    },
    singleData: async(req,res)=>{
        try {
         const data =await  adminGalleryControl.findById(req.params.id);
         return res.status(200).send({message:"success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     postData: async(req,res)=>{
        try {
         const data =await  adminGalleryControl.create({
            title:req.body.title,
            img:req.file.path,
            description:req.body.description
         });
         return res.status(200).send({message:"post success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     patchData: async(req,res)=>{
        try {
         const data =await  adminGalleryControl.findByIdAndUpdate(req.params.id, req.body, {new:true});
         return res.status(200).send({message:"updated success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     deleteData: async(req,res)=>{
        try {
         const data =await  adminGalleryControl.findByIdAndDelete(req.params.id);
         return res.status(200).send({message:"delete success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     }
}


module.exports = adminGalleryController;