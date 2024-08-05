const adminFestivalControl = require("../Models/Admin.festivals.model");
const uploadToWebSpaceKit = require('../middlewares/uploadToWebSpaceKit'); // Adjust path as necessary
const fs = require('fs');


const adminFestivalController ={
    getData: async(req,res)=>{
      
       try {
        const data =await  adminFestivalControl.find().sort({ createdAt: -1 });
        return res.status(200).send({message:"success", data});
       } catch (error) {
        return res.status(500).send({message:"error", error});
       }
    },
    singleData: async(req,res)=>{
        try {
         const data =await  adminFestivalControl.findById(req.params.id);
         return res.status(200).send({message:"success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     postData: async (req, res) => {
      try {
        const images = req.files; // Multiple files
        const imageUrls = [];
    
        for (const image of images) {
          const filePath = image.path;
          const fileName = image.filename;
    
          const result = await new Promise((resolve, reject) => {
            uploadToWebSpaceKit(filePath, fileName, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result.url);
              }
            });
          });
    
          imageUrls.push(result);
          fs.unlinkSync(filePath); // Remove local file
        }
    
        const data = await adminFestivalControl.create({
          title: req.body.title,
          description: req.body.description,
          fromDate: req.body.fromDate,
          toDate: req.body.toDate,
          img: imageUrls, // Multiple URLs
          location: req.body.location,
          festivalAgenda: req.body.festivalAgenda,
          additionalFields: req.body.additionalFields,
        });
    
        return res.status(200).send({ message: "post success", data });
      } catch (error) {
        return res.status(500).send({ message: "error", error });
      }
    },    
     patchData: async(req,res)=>{
        try {
         const data =await  adminFestivalControl.findByIdAndUpdate(req.params.id, req.body, {new:true});
         return res.status(200).send({message:"updated success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     deleteData: async(req,res)=>{
        try {
         const data =await  adminFestivalControl.findByIdAndDelete(req.params.id);
         return res.status(200).send({message:"delete success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     }
}


module.exports = adminFestivalController;