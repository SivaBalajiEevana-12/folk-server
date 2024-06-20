const yogaController = require("../Controllers/YogaForHappiness.controller");
const {Router} = require("express");
const yogaRouter = Router();

yogaRouter.get("/", yogaController.getData);
yogaRouter.get("/:id",yogaController.singleData);
yogaRouter.post("/addyogadata", yogaController.postData);
yogaRouter.patch("/:id", yogaController.patchData);
yogaRouter.delete("/:id", yogaController.deleteData);


module.exports = {yogaRouter}