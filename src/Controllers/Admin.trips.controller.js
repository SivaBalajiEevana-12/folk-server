const adminTripsControl = require("../Models/Admin.trips.model");
const uploadToWebSpaceKit = require('../middlewares/uploadToWebSpaceKit'); 
const fs = require('fs');

const adminTripsController = {
  getData: async (req, res) => {
    try {
      const data = await adminTripsControl.find().sort({ createdAt: -1 });
      return res.status(200).send({ message: "success", data });
    } catch (error) {
      return res.status(500).send({ message: "error", error });
    }
  },
  singleData: async (req, res) => {
    try {
      const data = await adminTripsControl.findById(req.params.id);
      return res.status(200).send({ message: "success", data });
    } catch (error) {
      return res.status(500).send({ message: "error", error });
    }
  },
  postData: async (req, res) => {
    try {
      const images = req.files; 
      const imageUrls = [];

      // Process each file
      for (const image of images) {
        const filePath = image.path;
        const fileName = image.filename;

        // Upload the file to ImageKit
        await new Promise((resolve, reject) => {
          uploadToWebSpaceKit(filePath, fileName, (err, result) => {
            if (err) {
              reject(err);
            } else {
              imageUrls.push(result.url); 
              resolve();
            }
          });
        });

       
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error('Error deleting local file:', unlinkErr);
          }
        });
      }

     
      const data = await adminTripsControl.create({
        tripName: req.body.tripName,
        from: req.body.from,
        to: req.body.to,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        img: imageUrls,  // Store the image URLs
        description: req.body.description,
        price: req.body.price,
        placesOfVisit: req.body.placesOfVisit,
        additionalFields: req.body.additionalFields,
      });

      return res.status(200).send({ message: "post success", data });
    } catch (error) {
      return res.status(500).send({ message: "error", error });
    }
  },

  patchData: async (req, res) => {
    try {
      const data = await adminTripsControl.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.status(200).send({ message: "updated success", data });
    } catch (error) {
      return res.status(500).send({ message: "error", error });
    }
  },
  deleteData: async (req, res) => {
    try {
      const data = await adminTripsControl.findByIdAndDelete(req.params.id);
      return res.status(200).send({ message: "delete success", data });
    } catch (error) {
      return res.status(500).send({ message: "error", error });
    }
  },

  // New aggregation methods

  getTripsGroupedByLocation: async (req, res) => {
    try {
      const data = await adminTripsControl.aggregate([
        { $group: { _id: "$to", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
      return res.status(200).send({ message: "success", data });
    } catch (error) {
      return res.status(500).send({ message: "error", error });
    }
  },

  getTotalRevenue: async (req, res) => {
    try {
      const data = await adminTripsControl.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: "$price" } } }
      ]);
      return res.status(200).send({ message: "success", data });
    } catch (error) {
      return res.status(500).send({ message: "error", error });
    }
  },

  getTripsByDateRange: async (req, res) => {
    const { startDate, endDate } = req.query; // Expects query params in YYYY-MM-DD format
    try {
      const data = await adminTripsControl.aggregate([
        { $match: { fromDate: { $gte: startDate }, toDate: { $lte: endDate } } },
        { $sort: { fromDate: 1 } }
      ]);
      return res.status(200).send({ message: "success", data });
    } catch (error) {
      return res.status(500).send({ message: "error", error });
    }
  },

  getMostPopularPlacesOfVisit: async (req, res) => {
    try {
      const data = await adminTripsControl.aggregate([
        { $unwind: "$placesOfVisit" },
        { $group: { _id: "$placesOfVisit", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
      return res.status(200).send({ message: "success", data });
    } catch (error) {
      return res.status(500).send({ message: "error", error });
    }
  }
};

module.exports = adminTripsController;
