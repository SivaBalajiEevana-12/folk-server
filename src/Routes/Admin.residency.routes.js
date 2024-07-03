const adminResidencyControlController = require("../Controllers/Admin.residency.controller");
const {Router} = require("express");
const uploads = require("../middlewares/fileUploads")
const adminResidencyControlRouter = Router();

adminResidencyControlRouter.get("/", adminResidencyControlController.getData);
adminResidencyControlRouter.get("/:id",adminResidencyControlController.singleData);
adminResidencyControlRouter.post("/addAdminResidency", uploads.single('img'), adminResidencyControlController.postData);
adminResidencyControlRouter.patch("/:id", adminResidencyControlController.patchData);
adminResidencyControlRouter.delete("/:id", adminResidencyControlController.deleteData);


module.exports = {adminResidencyControlRouter}