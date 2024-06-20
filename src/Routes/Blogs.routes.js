const blogsController = require("../Controllers/Festivals.controller");
const {Router} = require("express");
const blogsRouter = Router();

blogsRouter.get("/", blogsController.getData);
blogsRouter.get("/:id",blogsController.singleData);
blogsRouter.post("/addblogsdata", blogsController.postData);
blogsRouter.patch("/:id", blogsController.patchData);
blogsRouter.delete("/:id", blogsController.deleteData);


module.exports = {blogsRouter}