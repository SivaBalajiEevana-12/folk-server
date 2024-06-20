const mongoose = require('mongoose');

const tripsSchema = new mongoose.Schema({
    name:{type:String, required:true},
    fromLocation:{type:String, required:true},
    toLocation:{type:String, required:true},
    age:{type:Number,required:true},
    date :{type:String, required:true},
    price :{type:Number, required:false},
    
})


const tripsModel =  mongoose.model("trip", tripsSchema);

module.exports = tripsModel