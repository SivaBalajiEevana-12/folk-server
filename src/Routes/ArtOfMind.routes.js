const artController = require("../Controllers/ArtOfMind.controller");
const {Router} = require("express");
const artRouter = Router();

artRouter.get("/", artController.getData);
artRouter.get("/:id",artController.singleData);
artRouter.post("/addartsdata", artController.postData);
artRouter.patch("/:id", artController.patchData);
artRouter.delete("/:id", artController.deleteData);


module.exports = {artRouter}