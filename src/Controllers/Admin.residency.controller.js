const adminResidencyControl = require("../Models/Admin.residency.model");
const uploadStorage = require("../middlewares/uploadToWebSpaceKit")

const adminResidencyController ={
    getData: async(req,res)=>{
      
       try {
        const data =await  adminResidencyControl.find().sort({ createdAt: -1 });
        return res.status(200).send({message:"success", data});
       } catch (error) {
        return res.status(500).send({message:"error", error});
       }
    },
    singleData: async(req,res)=>{
        try {
         const data =await  adminResidencyControl.findById(req.params.id);
         return res.status(200).send({message:"success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     postData: async(req,res)=>{

        try {
         const imageUrl = await uploadStorage(req.file);
         const data =await  adminResidencyControl.create({
               residencyName:req.body.residencyName,
               location:req.body.location,
               feeAmount:req.body.feeAmount,
               description:req.body.description,
               img:imageUrl,
               availabilityStatus:req.body.availabilityStatus
         });
         return res.status(200).send({message:"post success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     patchData: async(req,res)=>{
        try {
         const data =await  adminResidencyControl.findByIdAndUpdate(req.params.id, req.body, {new:true});
         return res.status(200).send({message:"updated success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     deleteData: async(req,res)=>{
        try {
         const data =await  adminResidencyControl.findByIdAndDelete(req.params.id);
         return res.status(200).send({message:"delete success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     }
}


module.exports = adminResidencyController;