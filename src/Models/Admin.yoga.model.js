const mongoose = require('mongoose');

const adminYoga = new mongoose.Schema({
    date:{type:String, required:true},
    time:{type:String, required:true},
    duration:{type:String, required:true},
    location:{type:String, required:true},
    desc:{type:String, required:true}
},{
    versionKey:false,
    timestamps:true
})

const adminYogaModel =  mongoose.model("admin_yoga", adminYoga);

module.exports = adminYogaModel;