const adminTripsControlController = require("../Controllers/Admin.trips.controller");
const {Router} = require("express");
const adminTripsControlRouter = Router();

adminTripsControlRouter.get("/", adminTripsControlController.getData);
adminTripsControlRouter.get("/:id",adminTripsControlController.singleData);
adminTripsControlRouter.post("/addAdminTrips", adminTripsControlController.postData);
adminTripsControlRouter.patch("/:id", adminTripsControlController.patchData);
adminTripsControlRouter.delete("/:id", adminTripsControlController.deleteData);


module.exports = {adminTripsControlRouter}