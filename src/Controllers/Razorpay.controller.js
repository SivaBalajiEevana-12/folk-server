const RazorPay = require("razorpay");

var instance =new RazorPay({
    key_id:"rzp_test_KFMbDieVn7k8vK",
    key_secret:"wHAFOBKDMsH2BGD3QFWP6BiK"
})

const RazorpayController ={
    postData: async (req,res)=>{
        var options = {
            amount: req.body.amount * 100,  
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        try {
 
           const order = await instance.orders.create(options);

           res.send(order)
          } catch (error) {
            console.log(error.message);
          }
    }
}

module.exports = RazorpayController;