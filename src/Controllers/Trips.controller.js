const TripsModel = require("../Models/Trips.model");
const adminTripsModel = require("../Models/Admin.trips.model")
const mongoose = require("mongoose");
const tripsModel = require("../Models/Trips.model");
const TripsController ={
    getData: async(req,res)=>{
       try {
        const data =await  TripsModel.find().sort({ createdAt: -1 }).populate("eventId");
        return res.status(200).send({message:"success", data});
       } catch (error) {
        return res.status(500).send({message:"error", error});
       }
    },
    getAllEventsByLocation: async (req, res) => {
      try {
        const data = await adminTripsModel.aggregate([
          {
            $lookup: {
              from: "trips",  // Adjust this if the user collection has a different name
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
                tripName: "$tripName",
                eventId: "$_id",
                from: "$from",
                to: "$to",
                fromDate: "$fromDate",
                toDate: "$toDate",
                price: "$price",
                description: "$description",
                placesOfVisit: "$placesOfVisit"
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
              _id: "$_id.to",  // Group by the 'to' field for location
              totalEvents: { $sum: 1 },
              events: {
                $push: {
                  eventId: "$_id.eventId",
                  tripName: "$_id.tripName",
                  from: "$_id.from",
                  to: "$_id.to",
                  fromDate: "$_id.fromDate",
                  toDate: "$_id.toDate",
                  price: "$_id.price",
                  description: "$_id.description",
                  placesOfVisit: "$_id.placesOfVisit",
                  totalAttendees: "$totalAttendees",
                  attendeesDetails: "$attendeesDetails"
                }
              }
            }
          },
          {
            $project: {
              location: "$_id",  // Rename '_id' field to 'location'
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
      if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).send({ message: "Invalid event ID" });
      }
      const user = await tripsModel.findById(userId);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
 
      const event = await adminTripsModel.findById(eventId);
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
         const data =await  TripsModel.findById(req.params.id);
         return res.status(200).send({message:"success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     postData: async(req,res)=>{
        try {
         const data =await  TripsModel.create(req.body);
         return res.status(200).send({message:"post success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     patchData: async(req,res)=>{
        try {
         const data =await  TripsModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
         return res.status(200).send({message:"updated success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     },
     deleteData: async(req,res)=>{
        try {
         const data =await  TripsModel.findByIdAndDelete(req.params.id);
         return res.status(200).send({message:"delete success", data});
        } catch (error) {
         return res.status(500).send({message:"error", error});
        }
     }
}


module.exports = TripsController