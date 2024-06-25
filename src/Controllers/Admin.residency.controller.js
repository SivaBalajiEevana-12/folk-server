const adminResidencyControl = require("../Models/Admin.residency.model");


const adminResidencyController ={
    getData: async(req,res)=>{
      
       try {
        const data =await  adminResidencyControl.find();
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
         const data =await  adminResidencyControl.create(req.body);
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