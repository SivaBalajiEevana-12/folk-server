
const adminYogaController = require("../Controllers/Admin.yoga.controller");
const {Router} = require("express");
const adminYogaRouter = Router();

adminYogaRouter.get("/", adminYogaController.getData);
adminYogaRouter.get("/:id",adminYogaController.singleData);
adminYogaRouter.get("/one", adminYogaController.getAllEventsByLocation)
adminYogaRouter.post("/addAdminYoga", adminYogaController.postData);
adminYogaRouter.patch("/:id", adminYogaController.patchData);
adminYogaRouter.delete("/:id", adminYogaController.deleteData);


module.exports = {adminYogaRouter}