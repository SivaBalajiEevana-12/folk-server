const mongoose = require('mongoose');

const adminGallery = new mongoose.Schema({
    title:{type:String, required:true},
    img:{type:String, required:true},
    desc:{type:String, required:true},
   
},{
    versionKey:false,
    timestamps:true
})

const adminGalleryModel =  mongoose.model("admin_gallery", adminGallery);

module.exports = adminGalleryModel;