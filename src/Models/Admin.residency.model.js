const mongoose = require('mongoose');

const adminResidency = new mongoose.Schema({
    residencyName:{type:String, required:true},
    location:{type:String, required:true},
    feeAmount:{type:Number, required:true},
    description:{type:String, required:true},
    img:{type:String, required:true},
    availabilityStatus:[{type:String, required:false}],
},{
    versionKey:false,
    timestamps:true
})

const adminResidencyModel =  mongoose.model("admin_residency", adminResidency);

module.exports = adminResidencyModel;