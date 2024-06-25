const adminSecretSuccessController = require("../Controllers/Admin.secretSuccess.controller");
const {Router} = require("express");
const adminSecretSuccessControlRouter = Router();

adminSecretSuccessControlRouter.get("/", adminSecretSuccessController.getData);
adminSecretSuccessControlRouter.get("/:id",adminSecretSuccessController.singleData);
adminSecretSuccessControlRouter.post("/addAdminSecretSuccess", adminSecretSuccessController.postData);
adminSecretSuccessControlRouter.patch("/:id", adminSecretSuccessController.patchData);
adminSecretSuccessControlRouter.delete("/:id", adminSecretSuccessController.deleteData);


module.exports = {adminSecretSuccessControlRouter}