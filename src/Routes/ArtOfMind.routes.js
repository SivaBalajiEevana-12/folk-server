const artController = require("../Controllers/ArtOfMind.controller");
const {Router} = require("express");
const artRouter = Router();


artRouter.get("/events-by-location-users", artController.getAllEventsByLocation);
artRouter.get("/", artController.getData);
artRouter.get("/:id",artController.singleData);
artRouter.post("/addArtsData", artController.postData);
artRouter.patch("/postAttendance", artController.updateAttendance);
artRouter.patch("/:id", artController.patchData);
artRouter.delete("/:id", artController.deleteData);


module.exports = {artRouter}