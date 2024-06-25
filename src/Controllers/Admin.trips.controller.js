const adminTripsControl = require("../Models/Admin.trips.model");


const adminTripsController ={
    getData: async(req,res)=>{
      
       try {
        const data =await  adminTripsControl.find();
        return res.status(200).send({message:"success", data});
       } catch (error) {
        return res.status(500).send({message:"error", error});
       }
    },
    singleData: async(req,res)=>{
        try {
         const data =await  adminTripsControl.findById(req.params.id);
         return res.status(200).send({message:"success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     postData: async(req,res)=>{
        try {
         const data =await  adminTripsControl.create(req.body);
         return res.status(200).send({message:"post success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     patchData: async(req,res)=>{
        try {
         const data =await  adminTripsControl.findByIdAndUpdate(req.params.id, req.body, {new:true});
         return res.status(200).send({message:"updated success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     deleteData: async(req,res)=>{
        try {
         const data =await  adminTripsControl.findByIdAndDelete(req.params.id);
         return res.status(200).send({message:"delete success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     }
}


module.exports = adminTripsController;