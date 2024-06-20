const userController = require("../Controllers/User.controller");
const {Router} = require("express");
const userRouter = Router();


userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);



module.exports = {userRouter}