const mongoose = require("mongoose");
const adminYogaModel = require("../Models/Admin.yoga.model");
const YogaModel = require("../Models/YogaForHappiness.model");

const YogaForHappinessController = {
  getData: async (req, res) => {
    try {
      const data = await YogaModel.find().sort({ createdAt: -1 }).populate("eventId");
      return res.status(200).send({ message: "success", data });
    } catch (error) {
      return res.status(500).send({ message: "error", error });
    }
  },

  getAllEventsByLocation: async (req, res) => {
    try {
      const data = await adminYogaModel.aggregate([
        {
          $lookup: {
            from: "yogas", 
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
              date: "$date",
              time: "$time",
              duration: "$duration",
              price: "$price",
              description: "$description"
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
                date: "$_id.date",
                time: "$_id.time",
                duration: "$_id.duration",
                price: "$_id.price",
                description: "$_id.description",
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
  
  singleData: async (req, res) => {
    try {
      const data = await YogaModel.findById(req.params.id);
      return res.status(200).send({ message: "success", data });
    } catch (error) {
      return res.status(500).send({ message: "error", error });
    }
  },
  postData: async (req, res) => {
    try {
      const data = await YogaModel.create(req.body);
      return res.status(200).send({ message: "post success", data });
    } catch (error) {
      return res.status(500).send({ message: "error", error });
    }
  },

  updateAttendance: async (req, res) => {
    try {
      const { userId, eventId, status } = req.body;
      if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).send({ message: "Invalid event ID" });
      }
      const user = await YogaModel.findById(userId);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      const event = await adminYogaModel.findById(eventId);
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

  patchData: async (req, res) => {
    try {
      const data = await YogaModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).send({ message: "updated success", data });
    } catch (error) {
      return res.status(500).send({ message: "error", error });
    }
  },
  deleteData: async (req, res) => {
    try {
      const data = await YogaModel.findByIdAndDelete(req.params.id);
      return res.status(200).send({ message: "delete success", data });
    } catch (error) {
      return res.status(500).send({ message: "error", error });
    }
  },

};

module.exports = YogaForHappinessController;
