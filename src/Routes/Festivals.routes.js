const festivalController = require("../Controllers/Festivals.controller");
const {Router} = require("express");
const festivalRouter = Router();

festivalRouter.get("/", festivalController.getData);
festivalRouter.get("/:id",festivalController.singleData);
festivalRouter.post("/addfestivaldata", festivalController.postData);
festivalRouter.patch("/:id", festivalController.patchData);
festivalRouter.delete("/:id", festivalController.deleteData);


module.exports = {festivalRouter}