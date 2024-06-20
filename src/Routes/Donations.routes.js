const donationController = require("../Controllers/Festivals.controller");
const {Router} = require("express");
const donationRouter = Router();

donationRouter.get("/", donationController.getData);
donationRouter.get("/:id",donationController.singleData);
donationRouter.post("/adddonationdata", donationController.postData);
donationRouter.patch("/:id", donationController.patchData);
donationRouter.delete("/:id", donationController.deleteData);


module.exports = {donationRouter}