const mongoose = require('mongoose');

const adminTrips = new mongoose.Schema({
    name:{type:String, required:true},
    date:{type:String, required:true},
    amount:{type:Number, required:true},
    bgImg:{type:String, required:true},
    desc:{type:String, required:true},
    placesOfVisit:[{type:String, required:true}]
},{
    versionKey:false,
    timestamps:true
})

const adminTripsModel =  mongoose.model("admin_trips", adminTrips);

module.exports = adminTripsModel;