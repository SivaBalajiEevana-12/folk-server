const mongoose = require('mongoose');

const adminArtControl = new mongoose.Schema({
    date:{type:String, required:true},
    time:{type:String, required:true},
    duration:{type:String, required:true},
    location:{type:String, required:true},
    desc:{type:String, required:true}
},{
    versionKey:false,
    timestamps:true
})

const adminArtControlModel =  mongoose.model("admin_artControl", adminArtControl);

module.exports = adminArtControlModel;