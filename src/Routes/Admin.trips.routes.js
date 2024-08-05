const adminTripsControlController = require("../Controllers/Admin.trips.controller");
const { Router } = require("express");
const uploads = require("../middlewares/fileUploads");
const adminTripsControlRouter = Router();

// New aggregation routes
adminTripsControlRouter.get("/group-by-location", adminTripsControlController.getTripsGroupedByLocation);
adminTripsControlRouter.get("/total-revenue", adminTripsControlController.getTotalRevenue);
adminTripsControlRouter.get("/date-range", adminTripsControlController.getTripsByDateRange);
adminTripsControlRouter.get("/most-popular-places", adminTripsControlController.getMostPopularPlacesOfVisit);

adminTripsControlRouter.get("/", adminTripsControlController.getData);
adminTripsControlRouter.get("/:id", adminTripsControlController.singleData);
adminTripsControlRouter.post("/addAdminTrips",uploads, adminTripsControlController.postData);
adminTripsControlRouter.patch("/:id", adminTripsControlController.patchData);
adminTripsControlRouter.delete("/:id", adminTripsControlController.deleteData);

module.exports = { adminTripsControlRouter };
