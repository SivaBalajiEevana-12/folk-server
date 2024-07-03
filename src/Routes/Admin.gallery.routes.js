const adminGalleryController = require("../Controllers/Admin.gallery.controller");
const {Router} = require("express");
const uploads = require("../middlewares/fileUploads")
const adminGalleryRouter = Router();

adminGalleryRouter.get("/", adminGalleryController.getData);
adminGalleryRouter.get("/:id",adminGalleryController.singleData);
adminGalleryRouter.post("/addAdminGallery", uploads.single("img"), adminGalleryController.postData);
adminGalleryRouter.patch("/:id", adminGalleryController.patchData);
adminGalleryRouter.delete("/:id", adminGalleryController.deleteData);


module.exports = {adminGalleryRouter}