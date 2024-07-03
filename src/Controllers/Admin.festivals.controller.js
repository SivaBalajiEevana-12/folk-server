const adminFestivalControl = require("../Models/Admin.festivals.model");


const adminFestivalController ={
    getData: async(req,res)=>{
      
       try {
        const data =await  adminFestivalControl.find();
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
     postData: async(req,res)=>{
      console.log(req.body,req.file)
        try {
         const data =await  adminFestivalControl.create({
            title:req.body.title,
            description:req.body.description,
            fromDate:req.body.fromDate,
            toDate:req.body.toDate,
            img:req.file.path,
            location:req.body.location,
            festivalAgenda:req.body.festivalAgenda
         });
         return res.status(200).send({message:"post success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
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