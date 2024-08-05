const adminSecretSuccessControl = require("../Models/Admin.SecretSuccess.model");


const adminSecretSuccessController ={
    getData: async(req,res)=>{
      
       try {
        const data =await  adminSecretSuccessControl.find().sort({ createdAt: -1 });
        return res.status(200).send({message:"success", data});
       } catch (error) {
        return res.status(500).send({message:"error", error});
       }
    },
    singleData: async(req,res)=>{
        try {
         const data =await  adminSecretSuccessControl.findById(req.params.id);
         return res.status(200).send({message:"success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },

     getTotalUsers: async(req,res)=>{
      try {
         const getTotalUsers  = await adminSecretSuccessControl.aggregate([{$group:{_id:"$location",count:{$sum:1}}}]);
         return res.status(200).send({message:"total users", getTotalUsers})
      } catch (error) {
         return res.status(500).send({message:"error", error});
      }
     },
     postData: async(req,res)=>{
        try {
         const data =await  adminSecretSuccessControl.create(req.body);
         return res.status(200).send({message:"post success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     patchData: async(req,res)=>{
        try {
         const data =await  adminSecretSuccessControl.findByIdAndUpdate(req.params.id, req.body, {new:true});
         return res.status(200).send({message:"updated success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     deleteData: async(req,res)=>{
        try {
         const data =await  adminSecretSuccessControl.findByIdAndDelete(req.params.id);
         return res.status(200).send({message:"delete success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     }
}


module.exports = adminSecretSuccessController;