const festivalController = require("../Controllers/Festivals.controller");
const {Router} = require("express");
const festivalRouter = Router();


festivalRouter.get("/events-by-location-users", festivalController.getAllEventsByLocation);
festivalRouter.get("/", festivalController.getData);
festivalRouter.get("/:id",festivalController.singleData);
festivalRouter.post("/addFestivalData", festivalController.postData);
festivalRouter.patch("/postAttendance", festivalController.updateAttendance);
festivalRouter.patch("/:id", festivalController.patchData);
festivalRouter.delete("/:id", festivalController.deleteData);


module.exports = {festivalRouter}