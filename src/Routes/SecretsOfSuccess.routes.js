const secretController = require("../Controllers/SecretsOfSuccess.controller");
const {Router} = require("express");
const secretRouter = Router();

secretRouter.get("/events-by-location-users", secretController.getAllEventsByLocation);
secretRouter.get("/", secretController.getData);
secretRouter.get("/:id",secretController.singleData);
secretRouter.post("/addsecretsdata", secretController.postData);
secretRouter.patch("/postAttendance", secretController.updateAttendance);
secretRouter.patch("/:id", secretController.patchData);
secretRouter.delete("/:id", secretController.deleteData);



module.exports = {secretRouter}