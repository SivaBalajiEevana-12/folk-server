const mongoose = require('mongoose');

const donationsSchema = new mongoose.Schema({
    donarName:{type:String, required:true},
    mobileNumber:{type:Number, required:true},
    email:{type:String, required:true},
    gTax:{type:String,required:false},
    houseNumberOrDoorNumber:{type:String, required:true},
    location :{type:String, required:true},
    pinCode :{type:Number, required:true},
    city:{type:String, required:true},
    state:{type:String, required:true}
},{
    versionKey:false,
    timestamps:true
})


const donationsModel =  mongoose.model("Yoga", donationsSchema);

module.exports = {donationsModel}