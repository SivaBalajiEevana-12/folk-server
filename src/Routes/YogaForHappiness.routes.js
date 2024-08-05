const yogaController = require("../Controllers/YogaForHappiness.controller");
const {Router} = require("express");
const yogaRouter = Router();

yogaRouter.get("/events-by-location-users", yogaController.getAllEventsByLocation);
yogaRouter.get("/", yogaController.getData);
yogaRouter.get("/:id", yogaController.singleData);
yogaRouter.post("/addYogaData", yogaController.postData);
yogaRouter.patch("/postAttendance", yogaController.updateAttendance);
yogaRouter.patch("/:id", yogaController.patchData);
yogaRouter.delete("/:id", yogaController.deleteData);




module.exports = {yogaRouter}