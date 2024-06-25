const {Router} = require("express");
const razorPayController = require("../Controllers/Razorpay.controller")
const razorPayRouter = Router();

razorPayRouter.post("/order", razorPayController.postData)

module.exports = razorPayRouter;