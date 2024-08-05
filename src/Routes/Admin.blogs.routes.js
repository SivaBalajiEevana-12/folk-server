const adminBlogsController = require("../Controllers/Admin.blogs.controller");
const {Router} = require("express");
const uploads = require("../middlewares/fileUploads")
const adminBlogsRouter = Router();

adminBlogsRouter.get("/", adminBlogsController.getData);
adminBlogsRouter.get("/:id",adminBlogsController.singleData);
adminBlogsRouter.post("/addblogsdata",uploads, adminBlogsController.postData);
adminBlogsRouter.patch("/:id", adminBlogsController.patchData);
adminBlogsRouter.delete("/:id", adminBlogsController.deleteData);


module.exports = {adminBlogsRouter}