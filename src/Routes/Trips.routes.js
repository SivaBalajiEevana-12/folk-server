const tripsController = require("../Controllers/Trips.controller");
const {Router} = require("express");
const tripsRouter = Router();

tripsRouter.get("/", tripsController.getData);
tripsRouter.get("/:id",tripsController.singleData);
tripsRouter.post("/addtripsdata", tripsController.postData);
tripsRouter.patch("/:id", tripsController.patchData);
tripsRouter.delete("/:id", tripsController.deleteData);


module.exports = {tripsRouter}