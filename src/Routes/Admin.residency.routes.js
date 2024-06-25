const adminResidencyControlController = require("../Controllers/Admin.residency.controller");
const {Router} = require("express");
const adminResidencyControlRouter = Router();

adminResidencyControlRouter.get("/", adminResidencyControlController.getData);
adminResidencyControlRouter.get("/:id",adminResidencyControlController.singleData);
adminResidencyControlRouter.post("/addAdminResidency", adminResidencyControlController.postData);
adminResidencyControlRouter.patch("/:id", adminResidencyControlController.patchData);
adminResidencyControlRouter.delete("/:id", adminResidencyControlController.deleteData);


module.exports = {adminResidencyControlRouter}