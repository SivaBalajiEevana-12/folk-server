const adminArtControlController = require("../Controllers/Admin.artControl.controller");
const {Router} = require("express");
const adminArtControlRouter = Router();

adminArtControlRouter.get("/", adminArtControlController.getData);
adminArtControlRouter.get("/:id",adminArtControlController.singleData);
adminArtControlRouter.post("/addAdminArtControl", adminArtControlController.postData);
adminArtControlRouter.patch("/:id", adminArtControlController.patchData);
adminArtControlRouter.delete("/:id", adminArtControlController.deleteData);


module.exports = {adminArtControlRouter}