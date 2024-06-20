const galleryController = require("../Controllers/Gallery.controller");
const {Router} = require("express");
const galleryRouter = Router();

galleryRouter.get("/", galleryController.getData);
galleryRouter.get("/:id",galleryController.singleData);
galleryRouter.post("/addgallerydata", galleryController.postData);
galleryRouter.patch("/:id", galleryController.patchData);
galleryRouter.delete("/:id", galleryController.deleteData);


module.exports = {galleryRouter}