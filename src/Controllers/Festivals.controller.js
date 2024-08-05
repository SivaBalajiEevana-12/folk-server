const FestivalModel = require("../Models/Festivals.modal");
const adminFestivalMode  = require("../Models/Admin.festivals.model");
const mongoose = require("mongoose");
const festivalController ={
    getData: async(req,res)=>{
       try {
        const data =await  FestivalModel.find().sort({ createdAt: -1 }).populate("eventId");
        return res.status(200).send({message:"success", data});
       } catch (error) {
        return res.status(500).send({message:"error", error});
       }
    },

    getAllEventsByLocation: async (req, res) => {
      try {
        const data = await adminFestivalMode.aggregate([
          {
            $lookup: {
              from: "festivals", 
              localField: "_id",
              foreignField: "attendance.eventId",
              as: "userAttendance"
            }
          },
          {
            $unwind: {
              path: "$userAttendance",
              preserveNullAndEmptyArrays: true 
            }
          },
          {
            $unwind: {
              path: "$userAttendance.attendance",
              preserveNullAndEmptyArrays: true 
            }
          },
          {
            $match: { "userAttendance.attendance.status": true }
          },
          {
            $group: {
              _id: {
                location: "$location",
                eventId: "$_id",
                title: "$title",
                description: "$description",
                fromDate: "$fromDate",
                toDate: "$toDate",
                img: "$img",
                festivalAgenda: "$festivalAgenda",
                date: "$fromDate", // Use fromDate as date
                price: "$price"
              },
              totalAttendees: { $sum: 1 },
              attendeesDetails: { $push: {
                userId: "$userAttendance._id",
                name: "$userAttendance.name",
                email: "$userAttendance.email",
                watsAppNumber: "$userAttendance.watsAppNumber",
                age: "$userAttendance.age",
                collageOrCompany: "$userAttendance.collageOrCompany"
              }}
            }
          },
          {
            $group: {
              _id: "$_id.location",
              totalEvents: { $sum: 1 },
              events: {
                $push: {
                  eventId: "$_id.eventId",
                  title: "$_id.title",
                  description: "$_id.description",
                  fromDate: "$_id.fromDate",
                  toDate: "$_id.toDate",
                  img: "$_id.img",
                  festivalAgenda: "$_id.festivalAgenda",
                  date: "$_id.date",
                  price: "$_id.price",
                  location: "$_id.location",
                  totalAttendees: "$totalAttendees",
                  attendeesDetails: "$attendeesDetails"
                }
              }
            }
          },
          {
            $project: {
              location: "$_id",
              totalEvents: 1,
              events: 1,
              _id: 0
            }
          }
        ]);
    
        return res.status(200).send({ message: "success", data });
      } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).send({ message: "error", error });
      }
    } 
  , 
  
  updateAttendance: async (req, res) => {
   try {
     const { userId, eventId, status } = req.body;
     console.log(req.body);
     if (!mongoose.Types.ObjectId.isValid(eventId)) {
       return res.status(400).send({ message: "Invalid event ID" });
     }
     const user = await FestivalModel.findById(userId);
     if (!user) {
       return res.status(404).send({ message: "User not found" });
     }

     const event = await adminFestivalMode.findById(eventId);
     if (!event) {
       return res.status(404).send({ message: "Event not found" });
     }
     const existingAttendance = user.attendance.find(
       (att) => att.eventId.toString() === eventId
     );

     if (existingAttendance) {
       existingAttendance.status = status;
     } else {
       user.attendance.push({ eventId, status });
     }
     await user.save();

     return res
       .status(200)
       .send({ message: "Attendance updated successfully" });
   } catch (error) {
     console.error("Error details:", error);
     return res
       .status(500)
       .send({ message: "Error updating attendance", error });
   }
 },

    singleData: async(req,res)=>{
        try {
         const data =await  FestivalModel.findById(req.params.id);
         return res.status(200).send({message:"success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     postData: async(req,res)=>{
        try {
         const data =await  FestivalModel.create(req.body);
         return res.status(200).send({message:"post success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     patchData: async(req,res)=>{
        try {
         const data =await  FestivalModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
         return res.status(200).send({message:"updated success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     deleteData: async(req,res)=>{
        try {
         const data =await  FestivalModel.findByIdAndDelete(req.params.id);
         return res.status(200).send({message:"delete success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     }
}


module.exports = festivalController