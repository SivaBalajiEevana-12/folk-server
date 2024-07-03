const mongoose = require('mongoose');

const adminTrips = new mongoose.Schema({
    tripName:{type:String, required:true},
    from:{type:String, required:true},
    to:{type:String, required:true},
    fromDate:{type:String, required:true},
    toDate:{type:String, required:true},
    img:[{type:String, required:true}],
    description:{type:String, required:true},
    price:{type:Number, required:true},
    placesOfVisit:[{type:String, required:true}]
},{
    versionKey:false,
    timestamps:true
})

const adminTripsModel =  mongoose.model("admin_trips", adminTrips);

module.exports = adminTripsModel;