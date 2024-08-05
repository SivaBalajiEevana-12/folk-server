const tripsController = require("../Controllers/Trips.controller");
const {Router} = require("express");
const tripsRouter = Router();


tripsRouter.get("/events-by-location-users", tripsController.getAllEventsByLocation);
tripsRouter.get("/", tripsController.getData);
tripsRouter.get("/:id",tripsController.singleData);
tripsRouter.post("/addTripsData", tripsController.postData);
tripsRouter.patch("/postAttendance", tripsController.updateAttendance);
tripsRouter.patch("/:id", tripsController.patchData);
tripsRouter.delete("/:id", tripsController.deleteData);


module.exports = {tripsRouter}