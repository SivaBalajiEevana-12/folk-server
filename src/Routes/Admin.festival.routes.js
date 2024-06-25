const adminFestivalController = require("../Controllers/Admin.festivals.controller");
const {Router} = require("express");
const adminFestivalRouter = Router();

adminFestivalRouter.get("/", adminFestivalController.getData);
adminFestivalRouter.get("/:id",adminFestivalController.singleData);
adminFestivalRouter.post("/addAdminFestival", adminFestivalController.postData);
adminFestivalRouter.patch("/:id", adminFestivalController.patchData);
adminFestivalRouter.delete("/:id", adminFestivalController.deleteData);


module.exports = {adminFestivalRouter}