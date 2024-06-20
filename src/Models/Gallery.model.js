const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    name:{type:String, required:true},
    location:{type:String, required:true},
    about:{type:String, required:true},
    image:{type:String,required:true},
})


const galleryModel =  mongoose.model("gallery", gallerySchema);

module.exports = galleryModel