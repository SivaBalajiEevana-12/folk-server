const adminTripsControlController = require("../Controllers/Admin.trips.controller");
const {Router} = require("express");
const uploads = require("../middlewares/fileUploads")
const adminTripsControlRouter = Router();

adminTripsControlRouter.get("/", adminTripsControlController.getData);
adminTripsControlRouter.get("/:id",adminTripsControlController.singleData);
adminTripsControlRouter.post("/addAdminTrips",uploads.single("img"), adminTripsControlController.postData);
adminTripsControlRouter.patch("/:id", adminTripsControlController.patchData);
adminTripsControlRouter.delete("/:id", adminTripsControlController.deleteData);


module.exports = {adminTripsControlRouter}